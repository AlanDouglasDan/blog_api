import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes';
import connectDB from './db/db';

const app = express();
const port = process.env.PORT || 8001;
connectDB();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

const server = app.listen(port, () => {
    console.log(`Server started and running at port ${port}`);
});

export default server;