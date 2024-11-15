
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://khanzshinwari5371:tQ2Pxcej18FysgGi@medicineshop.btdmo.mongodb.net/?retryWrites=true&w=majority&appName=medicineShop')
.then(() => {
  console.log('MongoDB Connected...');
})
.catch((err) => {
  console.log('Error while connecting to MongoDB:', err);
});
