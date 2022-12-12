const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  News.init({
    title: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    tags: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
      allowNull: false,
    },
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
