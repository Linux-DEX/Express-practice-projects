const dotenv = require("dotenv");
const express = require("express");
const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoute");

dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
