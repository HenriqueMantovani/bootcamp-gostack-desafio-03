import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
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
}

export default new RecipientController();
