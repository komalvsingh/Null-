import React, { useState } from 'react';
import express from 'express';
import { addItem, deleteItem, updateItem,getitems,getstats} from '../controllers/itemController.js'; // Import item controller functions

const router = express.Router();

// Routes for item operations
router.post('/add', addItem);
router.delete('/delete/:id', deleteItem);
router.put('/update/:id', updateItem);
router.get('/items',getitems);
router.get('/stats',getstats);

export default router;