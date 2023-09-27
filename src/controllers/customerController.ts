import { Request, Response } from 'express';
import Customers from '../models/customerModel';

// Get all customers from the database
const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await Customers.findAll();
        res.status(200).json({ success: true, data: customers });
    } catch (error) {
        console.error('Error getting customers:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Get a single customer by ID from the database
const getCustomer = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const customer = await Customers.findByPk(id);
        if (!customer) {
            return res.status(404).json({ success: false, msg: `No customer with id: ${id} is found` });
        }
        res.status(200).json({ success: true, data: customer });
    } catch (error) {
        console.error('Error getting customer by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// TO-DO add role field

// Create a new customer in the database
const createCustomer = async (req: Request, res: Response) => {
    const { fullNamename, email, password, role } = req.body;
    try {
        const customer = await Customers.create({ fullNamename, email, password, role });
        res.status(201).json({ success: true, data: customer });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Update a customer by ID in the database
const updateCustomer = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { fullNamename, email, password, role } = req.body;
    try {
        const [updatedRowCount] = await Customers.update({ fullNamename, email, password, role }, { where: { id } });
        if (updatedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No customer with id: ${id} is found` });
        }
        const updatedCustomer = await Customers.findByPk(id);
        res.status(200).json({ success: true, data: updatedCustomer });
    } catch (error) {
        console.error('Error updating customer by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

// Delete a customer by ID from the database
const deleteCustomer = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const deletedRowCount = await Customers.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ success: false, msg: `No customer with id: ${id} is found` });
        }
        res.status(200).json({ success: true, msg: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer by ID:', error);
        res.status(500).json({ success: false, msg: 'Internal server error' });
    }
};

export {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
};
