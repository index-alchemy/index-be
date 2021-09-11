import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import usersController from './controllers/users.js';
import sprintsController from './controllers/sprints.js';
import pitchesController from './controllers/pitches.js';
import preferencesController from './controllers/preferences.js';
import commentsController from './controllers/comments.js';

const { CLIENT_URL } = process.env;

const app = express();

app.use(cookieParser());
app.use(cors({ 
  credentials: true, 
  origin: CLIENT_URL || 'https://acp-index.netlify.app' 
}));
app.use(express.json({ type: '*/*' }));

app.use('/api/v1/auth', authController);
app.use('/api/v1/users', usersController);
app.use('/api/v1/pitches', pitchesController);
app.use('/api/v1/sprints', sprintsController);
app.use('/api/v1/preferences', preferencesController);
app.use('/api/v1/comments', commentsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
