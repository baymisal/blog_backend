const bcrypt = require("bcryptjs");

const newPassword = "password123"; // Change this if needed

bcrypt.hash(newPassword, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed Password:", hash);
  }
});
