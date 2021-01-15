const { DataTypes } = require('sequelize');
const { db } = require('./index');
const Property = require('./properties');
const SourceField = require('./sourceFields');
/**
 * id: uuid, defaultValue: uuidv4
 * propertyId: uuid, references properties.id
 * sourceFieldId: uuid, references sourcefields.id. [the settings for what should happen if the reference is deleted]
 * details: string
 * isDeleted: boolean, default: false
 */

const PropertyDetail = db.define('PropertyDetail', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  // propertyId: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: Property,
  //     key: 'id',
  //   }
  // },
  // sourceFieldId: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: SourceField,
  //     key: 'id',
  //   }
  // },
  details: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

PropertyDetail.belongsTo(Property);
PropertyDetail.belongsTo(SourceField);

export default PropertyDetail;
