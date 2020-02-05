module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('delivery_men', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE, // Armazena a data de criação
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE, // Armazena a data de edição
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('delivery_men');
  },
};
