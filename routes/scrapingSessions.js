const express = require('express');
const router = express.Router();

// const { getDb } = require('../db/db');
const { ScraperSession, Source, Property } = require('../models');

router.get('/', async (req, res) => {
  const { scraper } = req.query;

  if (scraper && scraper !== 'NEW' && scraper !== 'UPDATE') {
    return res.status(400).json({
      message: 'scraper value must either be empty, NEW or UPDATE',
    });
  }

  try {
    const result = await ScraperSession.findAll({ include: { all: true, }, where: { scraper } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ScraperSession.findOne({ where: { id }, include: [{ model: Property }] });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { scraper, sourceId } = req.body;

  console.log('incoming params -> ', { scraper, sourceId });

  try {
    const source = await Source.findByPk(sourceId);

    const result = await ScraperSession.create({ scraper, });
    result.setSource(source);
    res.status(200).json(result);
  } catch (error) {
    console.error('failed to create scraper session -> ', error);
    res.status(500).json(error);
  }
});


router.patch('/markAsFailed/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = req.body;
    const [_, result] = await ScraperSession.update({
      result: 'FAILURE',
      resultMessage: error.toString(),
      endedAt: new Date(),
    }, { where: { id }, returning: true, plain: true, });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { scraper } = req.body;
  try {
    const [_, result] = await ScraperSession.update({ scraper }, {
      where: { id },
      returning: true,
      plain: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ScraperSession.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;