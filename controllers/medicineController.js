const Medicine = require('../models/Medicine');

// Get all medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new medicine
const addMedicine = async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const newMedicine = new Medicine({ name, description, price, stock });
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing medicine
const updateMedicine = async (req, res) => {
  const { id } = req.params;  // Get the medicine ID from the route params
  const { name, description, price, stock } = req.body;  // Get the new data from the request body

  try {
    // Find the medicine by ID
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    // Update the medicine fields
    medicine.name = name || medicine.name;
    medicine.description = description || medicine.description;
    medicine.price = price || medicine.price;
    medicine.stock = stock || medicine.stock;

    // Save the updated medicine
    await medicine.save();
    
    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a medicine
const deleteMedicine = async (req, res) => {
  const { id } = req.params;  // Get the medicine ID from the route params

  try {
    // Find and delete the medicine by ID
    const medicine = await Medicine.findByIdAndDelete(id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = {
  getMedicines,
  addMedicine, 
  updateMedicine,
  deleteMedicine
}