import User from "@/model/userModel";
import connectToDb from "@/lib/connectToDb";
import bcrypt from "bcryptjs";

const validateUserData = ({ firstName, lastName, email, password }) => {
  const errors = {};
  if (!firstName.trim()) errors.firstName = "First name is required.";
  if (!lastName.trim()) errors.lastName = "Last name is required.";
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email is not valid.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else {
    if (password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password))
      errors.password += " Include an uppercase letter.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.password += " Include a special character.";
  }
  return errors;
};

const signup = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDb();

  const { firstName, lastName,email, password } = req.body;
  const errors = validateUserData({
    firstName,
    lastName,
    email,
    password,
  });

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  await user.save();
  return res.status(201).json({ message: "Account created successfully" });
};

export default signup;
