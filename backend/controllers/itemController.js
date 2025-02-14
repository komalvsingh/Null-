import Item from '../models/itemModel.js'; // Import the Item model

// Add a new item
export const addItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully!', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error });
  }
};

export const getstats = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    const lowStock = await Item.countDocuments({ quantity: { $lt: 10 } }); // Adjust threshold if needed

    // Fetching low-stock item details
    const lowStockItems = await Item.find({ quantity: { $lt: 10 } }).select('itemName quantity');

    res.json({ totalItems, lowStock, lowStockItems });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getitems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};

// Update an item by ID
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
};
