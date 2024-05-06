import Order from "../models/order.js"; // Assuming Order model is defined in "../models/Order"

// Create Order Controller
export const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const userId = req.user.id; // Assuming you have middleware to get the current user's ID

    const newOrder = new Order({
      user: userId,
      items,
      totalPrice,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get Orders Controller
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to get the current user's ID
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
