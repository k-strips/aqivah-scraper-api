const express = require('express');
const router = express.Router();
// const data = require('./../data');
// // const { sequelize } = require('../index');
// const { getDb, initialize } = require('../db/db');
// // const Source = require('../_models/sources');
// const { sources } = require('./../data');

const { Source } = require('../models');
// const sources = require('./../models/sources');

router.get('/', async (req, res) => {
  try {
    const result = await Source.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Source.findByPK(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/next', async (req, res) => {
  try {
    const result = await Source.min('lastScrapedTime');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }

});

router.post('/', async (req, res) => {
  console.log('incoming from request -> ', req.body);

  // {
  //   startScraping: true,
  //     name: 'The Ghana Home Loans Website',
  //       url: 'http://theghanahomeloans.com',
  //         singlePropertyQuerySelector: 'querySelect > querySelect',
  //           sourceFields: [
  //             {
  //               id: 1,
  //               name: 'bd8eda89-8a2e-4b0b-8a02-af748aa42d23',
  //               type: '27faef8e-3cab-4451-8c1d-94072f26ce55',
  //               querySelector: '.details-title',
  //               isActive: true
  //             }
  //           ];
  // }


  const { name: label, url, lastScrapedTime, isActive, paginationType, singlePropertyQuerySelector, sourceFields, } = req.body;

  const { type: typeId, name: FieldId, querySelector, isActive: fieldIsActive, isAqivahField } = sourceFields;

  try {
    const result = await Source.create({
      label, url, lastScrapedTime, isActive, paginationType, singlePropertyQuerySelector,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { isActive, lastScrapedTime, paginationType, url, label } = req.body;

  try {
    const [_, result] = await Source.update({
      isActive, lastScrapedTime, paginationType, url, label,
    }, { where: { id }, returning: true, plain: true, });
    res.status(200).jsson(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'No ID passed' });

  try {
    const result = await Source.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
