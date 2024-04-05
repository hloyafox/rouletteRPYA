'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cards', 'createdAt');
    await queryInterface.removeColumn('Cards', 'updatedAt');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Cards', 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn('Cards', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },
};
