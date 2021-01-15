const { DataTypes } = require('sequelize');
const { db } = require('./index');

/**
//  * id: uuid, defaultValue: uuidv4
 * startedAt: date, defaultValue: now
//  * endedAt: date
//  * scraperId: uuid, references scrapers.id
//  * result: enum [success, failure]
//  * resultMessage: string
//  * type: enum [new_properties, update_properties]
 */

const { DataTypes } = require("sequelize/types");

const ScraperSession = db.define('ScraperSession', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  endedAt: {
    type: DataTypes.DATE,
    
  },
  resultMessage: {
    type: DataTypes.STRING,

  },
  result: {
    type: DataTypes.ENUM,
    values: ['SUCCESS', 'FAILURE',],
  },
});

export default ScraperSession;