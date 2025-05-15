'use strict';
const schema = process.env.NODE_ENV === 'production' ? 'public' : 'test';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      { tableName: 'frequency', schema },
      {
        id: {
          type: Sequelize.UUID,
          unique: true,
          allowNull: false,
          primaryKey: true,
        },
        when: {
          type: Sequelize.ENUM('hourly', 'daily'),
          allowNull: false,
          unique: false,
        },
      },
    );
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex({ tableName: 'frequency', schema }, [
      'id',
    ]);
    await queryInterface.dropTable({ tableName: 'frequency', schema });
    await queryInterface.sequelize.query(
      `DROP TYPE IF EXISTS ${schema}.enum_frequency_when CASCADE;`,
    );
  },
};
