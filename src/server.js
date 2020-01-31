import app from './app';

require('dotenv').config();

const port = process.env.PORT;
const hostname = process.env.HOST;

app.listen(3333);

console.log(`fastFeet API Running on --> http://${hostname}:${port}`);
