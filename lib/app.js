import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import usersController from './controllers/users.js';
import sprintsController from './controllers/sprints.js'


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', usersController);
app.use('/api/v1/sprints', sprintsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
