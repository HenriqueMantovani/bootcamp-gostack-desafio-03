import Sequelize, { Model } from 'sequelize';

class Signature extends Model {
  static init(sequelize) {
    // sequelize recebe a variável do arquivo "index.js" que guarda a conexao BD
    // chamando o metodo init da class Model
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://${process.env.HOST}:${process.env.PORT}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Signature;
