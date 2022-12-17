import cors from 'cors';
import express, { json, Response, Request } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { errorHandler, notFound } from './middlewares';

config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (_req: Request, res: Response) => {
	res.json({
		message: 'Start page',
	});
});

// app.use('/api');

app.use(notFound);
app.use(errorHandler);

export default app;
