import Sequelize, { Model } from 'sequelize';

class DevileryMen extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'delivery_men',
      }
    );
    return this;
  }

  // Associa um avatar_id dentro da tabela de users
  static associate(models) {
    // o "as" serve para mostrar o nome do campo que aparecerá na resposta de req
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default DevileryMen;
