const { DataTypes } = require('sequelize');
const { db } = require('./index');
const ScraperSession = require('./scraperSessions');
/**
 * id: uuid, defaultValue: uuidv4
 * url: string, [validation]
 * scraperSessionId: uuid, references scraperSession.id
 * 
 */

const Property = db.define('Property', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isUrl: true,
    }
  },
  scraperSessionId: {
    type: DataTypes.UUID,
    references: {
      model: ScraperSession,
      key: 'id',
    }
  }
});

export default Property;