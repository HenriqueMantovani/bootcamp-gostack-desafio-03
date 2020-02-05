import * as Yup from 'yup';
import DeliveryMen from '../models/DevileryMen';

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
      return res.status(400).json({ Error: 'Email inserido Incorretamente' });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation Fails' });
    }

    // Procura pelo "email" se ja existe um usuário cadastrado
    const deliveryExists = await DeliveryMen.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({ Error: 'User alredy exists.' });
    }

    const delivery = await DeliveryMen.create(req.body);

    return res.json(delivery);
  }

  // TODO: Fazer logica no name e newName e terminar o update
  /* async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      newName: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    // Ver se o req.body esta passando igual ao schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation Fails' });
    }

    const body = {
      name: req.body.name,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      state: req.body.state,
      city: req.body.city,
      zip_code: req.body.zip_code,
    };

    // Procura um Destinatário pelo Nome e Rua
    const recipient = await Recipient.findOne({
      where: { name: req.body.name, street: req.body.street },
    });

    // req.body;

    const recipientUpdated = await recipient.update(body);

    return res.json(recipientUpdated);
  } */
}

export default new RecipientController();
