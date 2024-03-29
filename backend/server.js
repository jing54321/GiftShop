import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import { notFound, errorHandler } from '../middleWare/errorMiddleWare.js';
import connectDB from './config/db.js';
import productRoutes from './Routes/productRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';
import uploadRoutes from './Routes/uploadRoutes.js';

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.get('/', (req, res) => {
        res.send('Api running......')
    })
}

app.use(express.json()) // declare will use json type body (req)

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve();


if(process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend','build','index.html')))

} 

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold))