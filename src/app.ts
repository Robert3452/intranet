import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './middlewares/passport';
import routes from './routes';

import passport from 'passport';

const app = express();
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

//routes

app.use('/', routes);

export default app;
