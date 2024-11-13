import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { home, users, privateRoute } from './routes';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(home.router);
server.use(users.router);
server.use(privateRoute.router);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
