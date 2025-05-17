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
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        cityId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'city',
            key: 'id',
          },
        },
        frequencyId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'frequency',
            key: 'id',
          },
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn('NOW'),
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
