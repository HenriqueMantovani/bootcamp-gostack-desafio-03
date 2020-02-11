import Sequelize, { Model } from 'sequelize';

// Teste

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );
    return this;
  }

  // Associa um avatar_id dentro da tabela de users
  static associate(models) {
    // o "as" serve para mostrar o nome do campo que aparecerá na resposta de req
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.DeliveryMen, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryMan',
    });
    // this.belongsTo(models.Recipient, {
    //   foreignKey: 'recipient_id',
    //   as: 'recipient',
    // });
  }
}

export default Delivery;
