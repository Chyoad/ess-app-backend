'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('temp_update_personils', {
      tanggal_update: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DATE
      },
      npp: {
        type: Sequelize.STRING(9),
        references: {
          model: 'master_personils',
          key: 'npp',
          as: 'npp',
        }
      },
      nama_lengkap: {
        type: Sequelize.STRING(50)
      },
      nama_panggil: {
        type: Sequelize.STRING(10)
      },
      agama: {
        type: Sequelize.STRING(20)
      },
      no_hp: {
        type: Sequelize.STRING(100)
      },
      email_lain: {
        type: Sequelize.STRING(50)
      },
      created_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.STRING(100)
      },
      status: {
        type: Sequelize.STRING(50)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('temp_update_personils');
  }
};