import * as Yup from 'yup';
import Mail from '../../lib/Mail';
// Models
import Delivery from '../models/Deliveries';
import DeliveryMen from '../models/DeliveryMen';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    // Ver se o req.body esta passando igual ao schema
    if (req.body.recipient_id === '')
      return res.status(400).json({ Error: 'Type the recipient_id' });
    if (req.body.deliveryman_id === '')
      return res.status(400).json({ Error: 'Type the deliveryman_id' });
    if (req.body.signature_id === '')
      return res.status(400).json({ Error: 'Type the signature_id' });
    if (req.body.product === '')
      return res.status(400).json({ Error: 'Type the product' });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation Fails' });
    }

    const deliveryMan = await DeliveryMen.findByPk(req.body.deliveryman_id, {
      attributes: ['name', 'email'],
    });

    if (!deliveryMan) {
      return res.status(400).json({ error: 'Delivery Man not found' });
    }

    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    // TODO: Melhorar corpo do email
    await Mail.sendMail({
      to: `${deliveryMan.name} <${deliveryMan.email}>`,
      subject: 'Nova encomenda',
      template: 'deliverydetails',
      context: {
        deliveryMan: deliveryMan.name,
        recipientName: recipient.name,
        adress: recipient.street + recipient.number,
      },
    });

    return res.status(200).json(delivery);
  }

  async get(req, res) {}
}

export default new RecipientController();
