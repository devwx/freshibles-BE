import Product from "../models/products.js";
import User from "../models/users.js";

// Get All Products Controller
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// Add to Cart Controller
export const addToCart = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id });
    const cartItem = userData.cartData.items.find(
      item => item.product.toString() === req.body.itemId
    );

    if (cartItem) {
      cartItem.quantity += 1;
      userData.cartData.totalPrice += cartItem.new_price;
    } else {
      const product = await Product.findById(req.body.itemId);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      userData.cartData.items.push({
        product: product._id,
        quantity: 1,
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
        new_price: product.new_price,
      });

      userData.cartData.totalPrice += product.new_price;
    }

    await userData.save();
    res.send(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Remove from Cart Controller
export const removeFromCart = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cartData.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    user.cartData.items.splice(itemIndex, 1);
    user.cartData.totalPrice = user.cartData.items.reduce(
      (total, item) => total + item.new_price * item.quantity,
      0
    );

    await user.save();

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Increase Item Quantity Controller
export const increaseItemQuantity = async (req, res) => {
  const { itemId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cartData.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    user.cartData.items[itemIndex].quantity++;
    user.cartData.totalPrice = user.cartData.items.reduce(
      (total, item) => total + item.new_price * item.quantity,
      0
    );

    await user.save();

    return res
      .status(200)
      .json({ message: "Item quantity increased successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Decrease Item Quantity Controller
export const decreaseItemQuantity = async (req, res) => {
  const { itemId } = req.params;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cartData.items.findIndex(
      item => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (user.cartData.items[itemIndex].quantity === 1) {
      return res
        .status(400)
        .json({ message: "Cannot decrease quantity below 1" });
    }

    user.cartData.items[itemIndex].quantity--;
    user.cartData.totalPrice = user.cartData.items.reduce(
      (total, item) => total + item.new_price * item.quantity,
      0
    );

    await user.save();

    return res
      .status(200)
      .json({ message: "Item quantity decreased successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Cart Items Controller
export const getCartItems = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id })
      .populate(
        "cartData.items.product",
        "name image category new_price old_price"
      )
      .exec();

    if (!userData || userData.cartData.items.length === 0) {
      return res.status(404).send([]);
    }

    const cartData = {
      items: userData.cartData.items,
      totalPrice: userData.cartData.totalPrice,
    };

    res.send(cartData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
