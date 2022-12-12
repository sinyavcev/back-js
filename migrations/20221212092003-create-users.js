module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        validate: { notEmpty: true },
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        validate: { notEmpty: true },
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
        type: Sequelize.STRING,
      },
      avatar: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
