import SourceField from './sourceFields';

const { db } = require('./index');
const { DataTypes } = require('sequelize');

/**
 * id: uuid, defaultValue: uuidv4
 * label: string
 * isAqivahField: boolean, defaultValue: false
 */

const Field = db.define('Field', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  label: {
    type: DataTypes.STRING,
    unique: true,
  },
  isAqivahField: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

Field.hasMany(SourceField);

export default Field;