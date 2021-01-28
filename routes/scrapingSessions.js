const express = require('express');
const router = express.Router();

// const { getDb } = require('../db/db');
const { ScraperSession } = require('../models');

router.get('/', async (req, res) => {
  try {
    const result = await ScraperSession.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ScraperSession.findOne({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const { scraper, } = req.body;

  try {
    const result = await ScraperSession.create({ scraper });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  const {id} = req.params;
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