import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    return res.json({ message: 'OK' });
  }
}

export default new RecipientController();
