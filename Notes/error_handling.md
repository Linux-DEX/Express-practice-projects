# Error Handling

## 1. Basic Error Handling

- In Express, you can handle error using middleware.
- When an error occurs, it is passed down through the middleware stack until it reachs an error-handling middleware.

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  throw new Error("Something went wrong!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

- if error is thrown, it will be caught by the error-handling middleware, which logs the error and sends a response to the client.

## 2. Centralized Error Handling Middleware

- for more complex application, it's recommended to centralize error handling in a dedicated middleware function.
- This approach helps maintain cleaner and more maintainable code.

```js
const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  throw new Error("Something went wrong!");
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

- In this setup, all errors are handeled through the `errorHandler` middleware, ensuring consistent error response.

## 3. Handling Asynchronous Erros

- With the rise of Asynchronous programming, handling errors in Asynchronous code is important. Express does not catch Asynchronous errors by default, so you need to handle them manually.

```js
const express = require("express");
const app = express();

app.get("/", async (req, res, next) => {
  try {
    throw new Error("Something went wrong!");
  } catch (err) {
    next(err);
  }
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## 4. Custom Error Classes

- Creating custom error classes can help manage different types of errors more effectively.
- Custom error classes can include additional properties and methods that provide more context about the error.

```js
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## 5. Logging Errors

- Logging errors is important for debugging and monitoring your application. You can use libraries like winston or morgan for more sophisticated logging.

```js
const express = require("express");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

app.get("/", (req, res, next) => {
  throw new Error("Something went wrong!");
});

// Centralized error handling middleware
function errorHandler(err, req, res, next) {
  logger.error(err.message, { metadata: err.stack });
  res.status(500).json({ error: err.message });
}

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## Points to consider while handling erros

- **Consistent Error Responses**: Ensure all errors are returned in a consistent format, making it easier for clients to handle errors.
- **Avoid Exposing Sensitive Information**: Do not expose stack traces or sensitive information in error responses in production.
- **Use HTTP Status Codes**: Use appropriate HTTP status codes to indicate the type of error (e.g., 400 for bad requests, 404 for not found, 500 for server errors).
- **Validation Errors**: Handle validation errors explicitly to provide meaningful feedback to users. This often involves checking user inputs and returning specific error messages.
- **Environment-Specific Handling**: Differentiate error handling behavior between development and production environments. In development, you might want detailed error messages and stack traces, whereas in production, you should provide user-friendly messages and log the details for further investigation.
