import express from 'express';
import beeperRouter from './routes/beeperRouter.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const port = 3000;
app.use(express.json());
// app.use('/',authRouter);
app.use('/api', beeperRouter);
app.listen(port, () => {
    console.log(`server listen to port:  ${port}`);
});
