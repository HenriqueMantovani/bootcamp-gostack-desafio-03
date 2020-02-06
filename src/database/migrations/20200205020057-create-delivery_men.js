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
        // td avatar_id da tabela users vai ser tb id contido na tabela files
        references: { model: 'files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
