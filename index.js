const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');



const PORT =  5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    
}));

app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('api running')
})
app.get('/test', (req, res) => {
    res.send('testing')
})

app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
