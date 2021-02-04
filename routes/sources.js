const express = require('express');
const router = express.Router();
// const data = require('./../data');
// // const { sequelize } = require('../index');
// const { getDb, initialize } = require('../db/db');
// // const Source = require('../_models/sources');
// const { sources } = require('./../data');

const { Source, SourceField, Field, FieldType, } = require('../models');
// const sourcefield = require('../models/sourcefield');
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
    const result = await Source.findByPk(id, { include: SourceField });
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

  const { name: label, url, lastScrapedTime, isActive, paginationType, singlePropertyQuerySelector, sourceFields, } = req.body;

  try {
    const source = await Source.create({ label, url, lastScrapedTime, isActive, paginationType, singlePropertyQuerySelector, });

    const SourceFields = await Promise.all(sourceFields.map(async each => {
      try {
        const { type: typeId, name: FieldId, querySelector: selector, isActive, isAqivahField } = each;

        console.log('source field -> ', each);

        const field = await Field.findByPk(FieldId);
        const fieldType = await FieldType.findByPk(typeId);
        const sourceField = await SourceField.create({
          selector,
        });
        await sourceField.setField(field);
        await sourceField.setFieldType(fieldType);
        console.log('value of source field -> ', sourceField);

        return sourceField;

      } catch (error) {
        console.error('failed to create source field -> ', error);
        res.status(500).json(error);
      }
    }));

    await source.addSourceFields(SourceFields);

    console.log(source);
    res.status(201).json(source);

  } catch (error) {
    console.log('error -> ', error);
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
