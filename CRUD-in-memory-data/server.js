const express = require("express");
const app = express();
const PORT = 3000;

// middleware to parse json bodies
app.use(express.json());

let products = [
  { id: 1, name: "laptop", price: 999.99 },
  { id: 2, name: "Headphones", price: 199.99 },
];

app.get("/", (req, res) => {
  res.send("Express app is running");
});

// retrieve all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// retrieve a single product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

// create a new product
app.post("/api/products", (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// update a product by id
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    Object.assign(product, req.body);
    res.json(product);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

// delete a product by id
app.delete("/api/products/:id", (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex > -1) {
    products.splice(productIndex, 1);
    res.json({ message: "Product deleted" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
