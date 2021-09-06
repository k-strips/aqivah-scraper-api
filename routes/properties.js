const express = require("express");
const router = express.Router();
// const data = require('./../data');
// const propertyResults = require('./../db/propertyResults');
// const Properties = require('../_models/properties');

// const { getDb } = require('../db/db');
// const { v4: uuid } = require('uuid');
// const { createPropertyDetail } = require('../_models/properties');

const {
  Property,
  PropertyDetail,
  ScraperSession,
  SourceField,
  Field,
  Source,
  FieldType,
} = require("../models");
const resolveCors = require("../middlewares/resolveCors");

router.use(resolveCors);

router.get("/", async (req, res) => {
  try {
    const result = await Property.findAll({
      include: { all: true, nested: true },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Property.findOne({
      where: { id },
      include: { all: true, nested: true },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { url } = req.body;

  try {
    const result = await Property.create({ url });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/batch", async (req, res) => {
  /**properties should be an array */
  const { properties, sourceId, scraperSessionId } = req.body;

  try {
    //get the source fields of the source that's currently being scraped
    const source = await Source.findByPk(sourceId, { include: { all: true } });
    await Source.update(
      {
        lastScrapedTime: new Date(),
        lastScrapedPage: parseInt(source.lastScrapedPage) + 1,
      },
      { where: { id: sourceId } }
    );

    //for each property in the array,
    const propertiesList = await Promise.all(
      properties.map(async (each) => {
        //for each source field belonging to that source (where we got the property from)

        const { details, url } = each;
        //create the property
        const property = await Property.create({ url }).catch((e) =>
          console.log(e)
        );

        //attempt to get the values which were scraped for all the source fields
        console.log(`\n source fields -> `, source.SourceFields);

        const detail = await Promise.all(
          source.SourceFields.map(async (field) => {
            const fieldId = field.id;
            const value = details[fieldId];
            //create the propertyDetail for each of the values.
            const propertyDetail = await PropertyDetail.create({
              details: value,
            }).catch((e) => {
              console.log(e);
            });

            await propertyDetail
              .setSourceField(field)
              .catch((e) => console.log(e));
            return propertyDetail;
          })
        );

        //link the details to the correct property
        property &&
          (await property
            .setPropertyDetails(detail)
            .catch((e) => console.log(e)));
        return property;
      })
    );
    console.log("\n created properties -> ", propertiesList);
    //return a successful response

    // const result = await Property.batchCreate(properties, { validate: true });

    //set scraper session to successful end
    const [_, scraperSession] = await ScraperSession.update(
      {
        endedAt: new Date(),
        result: "SUCCESS",
        resultMessage: "SUCCESS",
      },
      { where: { id: scraperSessionId }, returning: true }
    ).catch((e) => console.log(e));

    console.log("scraper session -> ", scraperSession);

    await scraperSession[0]
      .setProperties(propertiesList)
      .catch((e) => console.log(e));

    res.status(200).json(propertiesList);
  } catch (error) {
    console.log("failed to create scraped properties -> ", error);
    await ScraperSession.update(
      {
        endedAt: new Date(),
        result: "FAILURE",
        resultMessage: JSON.stringify(error),
      },
      { where: { id: scraperSessionId } }
    );
    res.status(500).json(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { url, ScraperSessionId } = req.body;

  try {
    const [_, result] = await Property.update(
      { url, ScraperSessionId },
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Property.destroy({ where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// function createNewProperty(params) {
//   const db = getDb();
//   const { id, scraperSessionId, uri } = params;

//   let newPropertyId = id;
//   if (Boolean(id)) newPropertyId = uuid();

//   const query = `
//     INSERT INTO properties
//       (id, uri, scraperSessionId)
//     VALUES
//       (?,?,?)
//     ;
//   `;

//   db.run(query, [id, uri, scraperSessionId], (err) => {
//     if (err) return ({ success: false, message: err });

//     return ({ success: true, message: 'Successfully created property' });
//   });

// }

// router.post('/', (req, res) => {
//   console.log('received properties -> ', req.body);

//   // if (propertyResults.length === 0) return res.status(400).send({ message: 'No property Details sent' });

//   const { scraperSessionId = '', properties = null } = req.body || {};

//   if (!Boolean(scraperSessionId)) return res.status(400).send({ message: 'Scraper session ID (scraperSessionId) is required' });

//   if ((!properties || properties.length === 0)) return res.status(400).send({ message: 'At least 1 property required.' });

//   //for each property, create a new property obj in the db.
//   let propertiesWithIds = [];
//   properties.some(each => {
//     const id = uuid();
//     const { uri } = each;

//     if (!Boolean(uri)) return res.status(400).send({ message: 'Property URI cannot be empty' });

//     const result = createNewProperty({ id, uri, scraperSessionId });
//     console.log('result of creating property -> ', result);
//     if (!result.success) return res.status(500).send({ message: response.message });

//     propertiesWithIds = [...propertiesWithIds, { id, uri, scraperSessionId }];

//   });

//   console.log('created properties -> ', propertiesWithIds);
//   // then create the entries in the property details

//   propertiesWithIds.some(each => {
//     const { sourceFieldId, details, propertyId } = each;
//     const params = { sourceFieldId, details, propertyId };

//     const response = createPropertyDetail(params);

//     //todo: check to see if this error returning works well
//     if (!response.success) return res.status(400).send(response);
//   });

//   return res.status(201).send({ message: 'Success' });
// });

// router.get('/', (req, res) => {
//   //get the scraper session whose properties you want to show. if there's no scraper session, then return paginated list of all
//   const { sessionId } = req.query;
//   console.log('incoming session id -> ', { sessionId, body: req.body, req, });
//   const callback = (err, rows) => {
//     console.log('response of gettin gproperties by session id -> ', { err, rows });
//     if (err) return res.status(400).send({ message: err || 'Something went wrong' });

//     res.status(200).send({ message: 'Success', data: rows, });
//   };

//   Properties.listPropertiesBySessionId(sessionId, callback);

// });

// router.get('/:id/details', (req, res) => {
//   const { id } = req.params;

//   const callback = (err, rows) => {
//     if (err) {
//       console.log('error fetching properties -> ', err);
//       return res.status(400).send({ message: err || 'Something went wrong' });
//     }

//     res.status(200).send({ message: 'Success', data: rows });
//   };

//   Properties.getDetails(id, callback);
// });

// router.post('/batch', (req, res) => {
//   // means it's coming from the scraper, in this format:
//   /** {
//    * id,
//    * scraperSessionId,
//    * properties: {
//    *  [id]: {id, sourceFieldId: details, uri: ' }
//    * }} */

//   console.log('incoming properties -> ', req.body);
//   req.body.properties.map(each => console.log(each.details));

//   const { scraperSessionId, properties } = req.body;

//   const mainCallback = (err, rows) => {
//     console.log("result of creating property details -> ", { err, rows });
//     if (err) return res.status(400).send({ message: err || 'Something went wrong', data: err, });

//     return res.status(201).send({ message: 'Success', data: rows });
//   };
//   //after creating the properties, if there were no issues, it means properties with the ids we have will be present in the db. we can go ahead to batch-create the fields.
//   const callbackToCreatePropertyDetails = (err, rows) => {
//     console.log('result of creating properties -> ', { err, rows });
//     if (err) return res.status(400).send({ message: err || 'something went wrong', data: err });

//     Properties.batchCreateDetails(properties, mainCallback);
//   };
//   Properties.batchCreate(scraperSessionId, properties, callbackToCreatePropertyDetails);

// });

module.exports = router;
