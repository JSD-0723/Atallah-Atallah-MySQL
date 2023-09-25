import express from 'express';
const router = express.Router();

const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController')

router.get('/', getCustomers)
router.get('/:id', getCustomer)
router.post('/', createCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

export default router