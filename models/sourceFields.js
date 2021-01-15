const { db } = require('./index');
const { DataTypes } = require('sequelize');
const { default: Field } = require('./fields');
const { default: Source } = require('./source');
const { default: FieldType } = require('./fieldTypes');

const SourceField = db.define('SourceField', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fieldId: {
    type: DataTypes.UUID,
    references: {
      model: Field,
      key: 'id',
    }
  },
  sourceId: {
    type: DataTypes.UUID,
    reference: {
      model: Source,
      key: 'id',
    }
  },
  typeId: {
    type: DataTypes.UUID,
    reference: {
      model: FieldType,
      key: 'id',
    }
  },
  selector: {
    type: DataTypes.STRING,
  },
  isAqivahField: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

export default SourceField;


/**
 * id: uuid, defaultValue: uuidv4,
 * fieldId: uuid, references fields.id
 * sourceId: uuid, references: source.id
 * typeId: uuid, references: fieldType.id
 * selector: string
 * isAqivahField: boolean, defaultValue: false
 * isRequired: boolean, defaultValue: false
 */
