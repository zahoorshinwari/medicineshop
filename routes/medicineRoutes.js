const express = require('express');
const router = express.Router();
// const { getMedicines, addMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicineController');
const { getMedicines, addMedicine, updateMedicine, deleteMedicine } = require('../controllers/medicineController')
router.get('/', getMedicines);
router.post('/', addMedicine);
router.put('/:id', updateMedicine);  // Route to update medicine by ID
router.delete('/:id', deleteMedicine);  // Route to delete medicine by ID

module.exports = router;
