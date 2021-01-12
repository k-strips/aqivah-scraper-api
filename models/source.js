const { DataTypes } = require('sequelize');
const { db } = require('./index');

const Source = db.define('Source', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  label: { type: DataTypes.STRING },
  url: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdAt: { type: DataTypes.NOW },
  lastScrapedTime: { type: DataTypes.DATE },
  paginationTypeId: {
    type: DataTypes.STRING,
    references: {

    }
  }
});

export default Source;

/**
 * id: uuid, defaultValue: uuidv4, primaryKey: true
 * label: string
 * url: string, [there's a way to validate the url. find it]
 * isActive: boolean, defaultValue: true
 * createdAt : date [is this automatically added to the table column?]
 * lastScrapedTime: date, defaultValue: now
 * paginationTypeId: uuid, references the paginationType table, the id field
 * singlePropertyQuerySelector: string
 * updatedAt: date, defaultValue: now [is this automatically added to the field]
 */
