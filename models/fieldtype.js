"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FieldType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SourceField }) {
      // define association here
      this.hasMany(SourceField);
    }
  }
  FieldType.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      label: {
        type: DataTypes.STRING,
        unique: true,
      },
      isRequired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FieldType",
    }
  );
  return FieldType;
};
