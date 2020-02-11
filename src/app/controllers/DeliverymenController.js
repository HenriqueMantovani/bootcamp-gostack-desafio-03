import * as Yup from 'yup';

// Models
import DeliveryMen from '../models/DeliveryMen';
import File from '../models/File';

// Regex para validação de email
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    // Ver se o req.body esta passando igual ao schema
    if (req.body.name === '')
      return res.status(400).json({ Error: 'Type the name' });
    if (req.body.email === '')
      return res.status(400).json({ Error: 'Type the email' });
    if (req.body.email && !validateEmail(req.body.email))
      return res.status(400).json({ Error: 'Wrong email syntax' });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation Fails' });
    }

    // Procura pelo "email" se ja existe um usuário cadastrado
    const deliveryExists = await DeliveryMen.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({ Error: 'Delivery Man alredy exists.' });
    }

    const delivery = await DeliveryMen.create(req.body);

    return res.json(delivery);
  }

  async index(req, res) {
    const deliveryMen = await DeliveryMen.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryMen);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation Fails' });
    }

    const deliveryman = await DeliveryMen.findByPk(req.params.id);

    if (!deliveryman)
      return res.status(400).json({ error: 'Delivery Man does not exist' });

    const { email } = req.body;

    // Verifica se o email que ele passou ja não existe no BD
    if (email !== deliveryman.email) {
      const deliveryManExists = await DeliveryMen.findOne({
        where: { email },
      });

      if (deliveryManExists) {
        return res.status(400).json({ error: 'Delivery Man alredy exists.' });
      }
    }

    const { id, name } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await DeliveryMen.findByPk(req.params.id);

    if (!deliveryman)
      return res.status(400).json({ error: 'Delivery Man does not exist' });

    await deliveryman.destroy();

    return res.status(200).json({
      message: 'Delivery Man removed',
    });
  }
}

export default new RecipientController();
