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
    const result = await Source.findAll({ include: { all: true, } });
    res.status(200).json(result);
  } catch (error) {
    console.error('error fetching sources -> ', error);
    res.status(500).json(error);
  }
});


router.get('/next', async (req, res) => {
  try {
    const result = await Source.findOne({
      order: [['lastScrapedTime', 'ASC']],
      include: [{ model: SourceField, include: { model: FieldType } }],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('failed to get next source to scrape -> ', error);

    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Source.findByPk(id, { include: { all: true, nested: false } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.post('/', async (req, res) => {
  console.log('incoming from request -> ', req.body);

  const { label, url, lastScrapedTime, isActive, paginationType, singlePropertyQuerySelector, sourceFields, clickPaginationSelector } = req.body;

  try {
    const source = await Source.create({ label, url, lastScrapedTime, isActive, paginationType, singlePropertyQuerySelector, clickPaginationSelector });

    const SourceFields = await Promise.all(sourceFields.map(async each => {
      try {
        const { type: typeId, name: FieldId, querySelector: selector, isActive, } = each;

        console.log('source field -> ', each);

        const field = await Field.findByPk(FieldId);
        const fieldType = await FieldType.findByPk(typeId);
        const sourceField = await SourceField.create({
          selector,
          isActive,
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
  const { isActive, paginationType, url, label, sourceFields } = req.body;

  try {
    const [_, result] = await Source.update({
      isActive, paginationType, url, label,
    }, { where: { id }, returning: true, plain: true, });

    const source = await Source.findOne({ where: { id } });
    // for each sourceField, create/update it
    const finalSourceFields = await Promise.all(sourceFields.map(async each => {
      const { selector, type, field: fieldId, isActive, id } = each;

      const field = await Field.findByPk(fieldId);
      const fieldType = await FieldType.findByPk(type);

      const value = await SourceField.upsert({ selector, id, isActive });
      const sourceField = value[0];
      console.log('value of source field -> ', sourceField);

      field && await sourceField.setField(field);
      fieldType && await sourceField.setFieldType(fieldType);

      console.log('\n updated source field -> ', sourceField);

      return sourceField;
    }, { returning: true, }));

    // set the sourceFields to the current list of sourceFields
    console.log('value of final sourceFields -> ', finalSourceFields);

    await source.setSourceFields(finalSourceFields);
    console.log('value of source -> ', source);


    res.status(200).json(result);
  } catch (error) {
    console.log('error occurred while updating source -> ', error);
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
