import asychHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

// ********* User Registration*********** //
// ********* POST Request*********** //
// ********* POST /api/register*********** //
// ********* Access Public*********** //

const userRegister = asychHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password );

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,

      token: generateToken(user._id),
    });
  } else {
    throw new Error("User Not Created ");
  }
});

// ********* User Authentication Login*********** //
// ********* POST /api/user*********** //
// ********* Access Publice*********** //

const authUser = asychHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    //console.log('authentic user', user)
    // console.log(generateToken(user._id));
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email and Password");
  }
});

const getAllUser = asychHandler(async (req, res) => {
  const getPro = await User.find({});

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

const deleteUser = asychHandler(async (req, res) => {
  console.log(req.params.id);
  const getPro = await User.findByIdAndRemove(req.params.id);

  if (getPro) {
    res.json({ message: "Product is Deleted  ", getPro });
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

const getUserById = asychHandler(async (req, res) => {
  const getPro = await User.findOne({ userId: req.params.id });

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "Product Not Delete" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Check if the request includes a new password and old password
    if (req.body.oldPassword && req.body.newPassword) {
      const oldPasswordMatch = await bcrypt.compare(
        req.body.oldPassword,
        user.password
      );

      if (oldPasswordMatch) {
        // If the old password matches, hash and update the new password
        const saltRounds = 10; // You can adjust this value as needed
        const hashedNewPassword = await bcrypt.hash(
          req.body.newPassword,
          saltRounds
        );
        user.password = hashedNewPassword;
      } else {
        res.status(400).json({ message: "Old password does not match" });
        return;
      }
    }

    const updatedUser = await user.save();
    if (updatedUser) {
      res.json({
        message: "User Updated Successfully",
      });
    } else {
      res.status(500).json({ message: "Failed to update user" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export {
  userRegister,
  authUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
};
