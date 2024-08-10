const cors = require("cors"); // Import the cors package
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Your Vite frontend URL
    credentials: true, // Allow credentials (cookies) to be included in requests
  })
);

app.use(express.json()); // To parse JSON bodies

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Signup Route
app.post("/signup", async (req, res) => {
  const { first_name, last_name, email, username, password, access_level } = req.body;
  try {
    const newUser = new User({
      first_name,
      last_name,
      email,
      username,
      password,
      access_level,
    });
    await newUser.save();
    res.status(201).send(`User ${username} signed up successfully!`);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      // If the user doesn't exist
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Check if the password matches
    if (user.password !== password) {
      // If the password is incorrect
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // If the username and password are correct, return user details
    res.json({
      success: true,
      username: user.username,
      access_level: user.access_level,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ success: false, message: error.message });
  }
});

// Logout Route (if using client-side storage for authentication, this would clear the client-side storage)
app.post("/logout", (req, res) => {
  // Perform any necessary cleanup or invalidation if needed
  res.send("Logged out successfully!");
});

mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
