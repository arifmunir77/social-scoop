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

export { userRegister, authUser };
