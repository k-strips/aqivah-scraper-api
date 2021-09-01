const express = require("express");
const router = express.Router();
// const data = require('../data');
const { getDb, initialize } = require("../db/db");
const { Field } = require("../models");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

router.get("/", async (req, res) => {
  try {
    const { required: isRequired } = req.query;
    const fields = isRequired
      ? await Field.findAll({ where: { isRequired } })
      : await Field.findAll();
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params || {};

  try {
    const field = await Field.findOne({ where: { id } });
    res.status(200).json(field);
  } catch (error) {
    console.error("failed to get field -> ", error);
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { label, isAqivahField, isRequired } = req.body;

  try {
    const [_, response] = await Field.update(
      { label, isAqivahField, isRequired },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { label, isAqivahField, isRequired } = req.body || {};

  try {
    const field = await Field.create({ label, isAqivahField, isRequired });
    res.status(201).json(field);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Field.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
