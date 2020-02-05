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
        tableName: 'devilery_men',
      }
    );
    return this;
  }
}

export default DevileryMen;
