import asynchHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// ********* User Registration*********** //
// ********* POST Request*********** //
// ********* POST /api/register*********** //
// ********* Access Public*********** //

const userRegister = asynchHandler(async (req, res) => {
  const { name, email, password } = req.body;
   

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
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

const authUser = asynchHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const user = await User.findOne({ email });
  
  if (user) {
    // User with the provided email exists, now compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // Passwords match, generate and send a token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // Passwords don't match
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } else {
    // User with the provided email does not exist
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getAllUser = asynchHandler(async (req, res) => {
  const getPro = await User.find({});

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "User Not Delete" });
  }
});

const deleteUser = asynchHandler(async (req, res) => {
  console.log(req.params.id);
  const getPro = await User.findByIdAndRemove(req.params.id);

  if (getPro) {
    res.json({ message: "User is Deleted  ", getPro });
  } else {
    res.status(404).json({ message: "User Not Delete" });
  }
});

const getUserById = asynchHandler(async (req, res) => {
  const getPro = await User.findOne({ userId: req.params.id });

  if (getPro) {
    res.json(getPro);
  } else {
    res.status(404).json({ message: "User Not Delete" });
  }
});



// *********UPDATE user By Id YOu can update your name ,email and password  *********** //
// ********* PUT /api/user/:id*********** //
// ********* Access Publice*********** //

const updateUser = asychHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  console.log("oldData", user, req.body);

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
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
        console.log("hashedNewPassword", hashedNewPassword);
        user.password = hashedNewPassword;
        console.log("user", user);
      } else {
        res.status(400).json({ message: "Old password does not match" });
        return;
      }
    }
    console.log("yser", user);

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
