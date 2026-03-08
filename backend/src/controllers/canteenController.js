import Canteen from '../models/Canteen.js';

// @desc    Get all canteen items
// @route   GET /api/canteen
// @access  Private
export const getCanteenItems = async (req, res) => {
  try {
    const items = await Canteen.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a canteen item
// @route   POST /api/canteen
// @access  Private
export const createCanteenItem = async (req, res) => {
  try {
    const newItem = await Canteen.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a canteen item
// @route   PUT /api/canteen/:id
// @access  Private
export const updateCanteenItem = async (req, res) => {
  try {
    const item = await Canteen.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a canteen item
// @route   DELETE /api/canteen/:id
// @access  Private
export const deleteCanteenItem = async (req, res) => {
  try {
    const item = await Canteen.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
