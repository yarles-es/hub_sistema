import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import router from './routes/catraca.route';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/catraca', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
