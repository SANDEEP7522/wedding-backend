import express from 'express';
import { StatusCodes } from 'http-status-codes';

import dbConection from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConection();
});
