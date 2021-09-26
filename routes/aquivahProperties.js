const express = require("express");
const router = express.Router();

const resolveCors = require("../middlewares/resolveCors");
const { PropertyDetail, SourceField, Field, Property } = require("../models");

router.use(resolveCors);

router.get("/", async (req, res) => {
  try {
    let data = [];

    // Pagination
    const limitNum = 10;
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || limitNum;
    const skip = (page - 1) * limit;

    const fetchedRequiredProperties = await Property.findAll({
      offset: skip,
      // limit,
      include: [
        {
          model: PropertyDetail,
          // separate: true,
          attributes: ["id", "details"],
          include: [
            {
              model: SourceField,
              // separate: true,
              where: { isRequired: true },
              attributes: ["id", "defaultValue"],
              include: [
                {
                  model: Field,
                  // separate: true,
                  where: { isRequired: true },
                  attributes: ["id", "label"],
                },
              ],
            },
          ],
        },
      ],
    });

    const totalResults = await Property.findAll({
      include: [
        {
          model: PropertyDetail,
          attributes: ["id"],
        },
      ],
    });

    fetchedRequiredProperties.forEach((prop) => {
      let eachProperty = {};
      prop.PropertyDetails.forEach((propDetail) => {
        if (!propDetail.details) {
          eachProperty[propDetail.SourceField.Field.label] =
            propDetail.SourceField.defaultValue;
        } else {
          eachProperty[propDetail.SourceField.Field.label] = propDetail.details;
        }
      });
      data.push(eachProperty);
    });

    res.status(200).json({
      status: "success",
      page,
      perPage: data.length,
      totalResults: totalResults.length,
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
