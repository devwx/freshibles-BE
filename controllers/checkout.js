import Order from "../models/order.js";
import User from "../models/users.js";
import stripe from "stripe";

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Checkout Session Controller
export const checkoutSession = async (req, res) => {
  try {
    const { user } = req;
    const { products } = req.body;

    // Calculate total price
    const totalPrice = products.reduce(
      (total, product) => total + product.new_price * product.quantity,
      0
    );

    // Create the order
    const orderItems = products.map(product => ({
      product: product._id,
      quantity: product.quantity,
      price: product.new_price,
      name: product.name,
      image: product.image,
      category: product.category,
    }));

    const order = new Order({
      user: user.id,
      items: orderItems,
      totalPrice,
    });

    // Save the order to the database
    await order.save();

    // Update user's cart by removing purchased items
    await User.findByIdAndUpdate(user.id, {
      $pull: {
        "cartData.items": {
          product: { $in: products.map(product => product._id) },
        },
      },
    });

    // Create Stripe checkout session
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map(product => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.new_price * 100),
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: "https://freshibles.vercel.app/",
      cancel_url: "https://freshibles.vercel.app/",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
