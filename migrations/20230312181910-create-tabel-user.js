'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tabel_users', {
      npp: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(9),
        references: {
          model: 'master_personils',
          key: 'npp',
          as: 'npp',
        }
      },
      password: {
        type: Sequelize.STRING(1000)
      },
      otp: {
        type: Sequelize.STRING
      },
      otp_expiration: {
        type: Sequelize.DATE
      },
      group_akses: {
        type: Sequelize.INTEGER
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      created_by: {
        type: Sequelize.STRING(9)
      },
      active: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tabel_users');
  }
};