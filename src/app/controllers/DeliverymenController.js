import * as Yup from 'yup';
import DeliveryMen from '../models/DevileryMen';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      avatar_id: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    // Ver se o req.body esta passando igual ao schema

    if (req.body.name === '')
      return res.status(400).json({ Message: 'Type the name' });
    if (req.body.street === '')
      return res.status(400).json({ Message: 'Type the street' });
    if (req.body.number === '')
      return res.status(400).json({ Message: 'Type the number' });
    if (req.body.complement === '')
      return res.status(400).json({ Message: 'Type the complement' });
    if (req.body.state === '')
      return res.status(400).json({ Message: 'Type the state' });
    if (req.body.city === '')
      return res.status(400).json({ Message: 'Type the city' });
    if (req.body.zip_code === '')
      return res.status(400).json({ Message: 'Type the zip code' });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation Fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  // TODO: Fazer logica no name e newName e terminar o update
  async update(req, res) {
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
  }
}

export default new RecipientController();
