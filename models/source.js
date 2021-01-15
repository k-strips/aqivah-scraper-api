const { DataTypes } = require('sequelize');
const { db } = require('./index');

const Source = db.define('Source', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  label: { type: DataTypes.STRING },
  url: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  createdAt: { type: DataTypes.NOW },
  lastScrapedTime: { type: DataTypes.DATE },
  paginationType: {type: DataTypes.ENUM}
});

export default Source;

/**
 * id: uuid, defaultValue: uuidv4, primaryKey: true
 * label: string
 * url: string, [there's a way to validate the url. find it]
 * isActive: boolean, defaultValue: true
//  * createdAt : date [is this automatically added to the table column?]
 * lastScrapedTime: date, defaultValue: now
 * paginationTypeId: enum, options: PAGINATED, INFINITE
 * singlePropertyQuerySelector: string
//  * updatedAt: date, defaultValue: now [is this automatically added to the field]
 */
