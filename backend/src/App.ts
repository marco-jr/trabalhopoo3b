import * as cors from 'cors';

import 'reflect-metadata';
import * as express from 'express';
import { createConnection } from 'typeorm';

createConnection();
import Routes from './routes';

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use(Routes);

export default app;
