const express = require("express");
const routes = express.Router();
const { FieldType } = require("../models");
const resolveCors = require("../middlewares/resolveCors");
const APIFeatures = require("../utils/apiFeatures");

routes.use(resolveCors);

routes.get("/", async (req, res) => {
  try {
    const appendFeatures = new APIFeatures(
      FieldType,
      req.query
    ).filterAndPaginate();

    const page = appendFeatures.page;

    const fieldType = await appendFeatures.query;
    const totalResults = await FieldType.findAll();

    res.status(200).json({
      status: "success",
      page,
      perPage: fieldType.length,
      nextPage: `https://${req.get("host")}/field-types?page=${page + 1}`,
      prevPage: `https://${req.get("host")}/field-types?page=${page - 1}`,
      totalResults: totalResults.length,
      data: {
        fieldType,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.post("/", async (req, res) => {
  const { label } = req.body;

  try {
    const result = await FieldType.create({ label });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params || {};

  try {
    const result = await FieldType.findOne({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { label } = req.body;

  try {
    const [_, result] = await FieldType.update(
      { label },
      {
        where: { id },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

routes.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await FieldType.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = routes;
