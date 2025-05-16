'use strict';
const schema = process.env.NODE_ENV === 'production' ? 'public' : 'test';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { schema, tableName: 'user-city-frequencies' },
      {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        city_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'city',
            key: 'id',
          },
        },
        frequency_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'frequency',
            key: 'id',
          },
        },
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      { tableName: 'user-city-frequencies', schema },
      'user-city-frequencies_city_id_fkey',
    );
    await queryInterface.removeConstraint(
      { tableName: 'user-city-frequencies', schema },
      'user-city-frequencies_frequency_id_fkey',
    );
    await queryInterface.removeConstraint(
      { tableName: 'user-city-frequencies', schema },
      'user-city-frequencies_user_id_fkey',
    );
    await queryInterface.removeIndex(
      { tableName: 'user-city-frequencies', schema },
      ['id'],
    );
    await queryInterface.dropTable({
      schema,
      tableName: 'user-city-frequencies',
    });
  },
};
