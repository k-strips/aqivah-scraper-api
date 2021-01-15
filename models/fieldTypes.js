const { db } = require('./index');
const { DataTypes } = require('sequelize');
/**
 * id: uuid, defaultValue: uuidv4
 * label: string
 */

const FieldType = db.define('FieldType', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  label: {
    type: DataTypes.STRING,
    unique: true,
  }
});

export default FieldType;