import express from 'express';
import morgan from 'morgan';
import path from 'path';

import indexRoute from './routes/index';

const app = express();

// settings
app.set('port', process.env.PORT || 4000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// public folder
app.use('/uploads', express.static(path.resolve('uploads')));

// routes
app.use('/api', indexRoute)

export default app;