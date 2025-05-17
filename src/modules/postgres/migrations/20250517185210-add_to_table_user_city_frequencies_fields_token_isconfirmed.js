'use strict';
const schema = process.env.NODE_ENV === 'production' ? 'public' : 'test';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      {
        schema,
        tableName: 'user-city-frequencies',
      },
      'confirmationToken',
      {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4(),
        allowNull: false,
        unique: true,
      },
    );
    await queryInterface.addColumn(
      {
        schema,
        tableName: 'user-city-frequencies',
      },
      'isConfirmed',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      {
        schema,
        tableName: 'user-city-frequencies',
      },
      'confirmationToken',
    );
    await queryInterface.removeColumn(
      {
        schema,
        tableName: 'user-city-frequencies',
      },
      'isConfirmed',
    );
  },
};
