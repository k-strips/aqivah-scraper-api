'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SourceField extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Field, Source, FieldType }) {
      // define association here
      this.belongsTo(Field);
      this.belongsTo(Source);
      this.belongsTo(FieldType, { foreignKey: 'typeId' });
    }
  };
  SourceField.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    selector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAqivahField: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'SourceField',
  });
  return SourceField;
};