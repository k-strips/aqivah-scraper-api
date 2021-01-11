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
