'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SourceField, ScraperSession }) {
      // define association here
      this.hasMany(SourceField);
      this.hasMany(ScraperSession);
    }
  };
  Source.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      // defaultValue: true,
      allowNull: false,
    },
    lastScrapedTime: {
      type: DataTypes.DATE,
      defaultValue: new Date(0),
      allowNull: false,
    },
    lastScrapedPage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    paginationType: {
      type: DataTypes.ENUM("INFINITE", "CLICK"),
      defaultValue: "CLICK",
      allowNull: false,
    },
    singlePropertyQuerySelector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clickPaginationSelector: {
      type: DataTypes.STRING,

    }

  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};