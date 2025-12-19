const userModel = require("../models/user");
const orderModel = require("../models/orderModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required" });
    }

    if (!email) {
      return res.send({ message: "Email is Required" });
    }

    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }

    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        message: "Required email or password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      return res
        .status(404)
        .send({ success: false, message: "Wrong password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "User Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//forgot password

exports.forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New password is required" });
    }

    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong email and answer" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update profile controller

exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // if (password && password.length < 6) {
    //   return res
    //     .status(400)
    //     .json({ error: "Password must be at least 6 characters long" });
    // }

    const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while update profile",
      error,
    });
  }
};

//orders

exports.getOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Error while geting orders" });
  }
};

//all orders

exports.getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders",
      error,
    });
  }
};

//order status update

exports.orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error while updating order", error });
  }
};

//test controller

exports.testController = (req, res) => {
  res.status(200).send({ message: "This is protected route" });
};
