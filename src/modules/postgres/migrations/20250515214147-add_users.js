'use strict';
const schema = process.env.NODE_ENV === 'production' ? 'public' : 'test';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: 'users', schema },
      {
        id: {
          type: Sequelize.UUID,
          unique: true,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex({ tableName: 'users', schema }, ['email']);
    await queryInterface.removeIndex({ tableName: 'users', schema }, ['id']);
    await queryInterface.dropTable({ tableName: 'users', schema });
  },
};
