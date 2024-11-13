import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { home, users } from './routes';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(home.router);
server.use(users.router);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
