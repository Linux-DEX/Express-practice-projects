# Express Basics

Express.js is a minimal and flexible Node.js web application framework that provides a list of features for building web and mobile applications easily. It simplifies the development of server-side applications by offering an easy-to-use API for routing, middleware, and HTTP utilities.

- Built on Node.js for fast and scalable server-side development.
- Simplifies routing and middleware handling for web applications.
- Supports building REST APIs, real-time applications, and single-page applications.
- Provides a lightweight structure for flexible and efficient server-side development.

## first code

```js
// Import Express
const express = require("express");
const app = express();

// Define a route
app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Tutorial");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

## Creating expressjs project

- Initialize project

```js
mkdir my-express-app

cd my-express-app
```

- Initialize `package.json`

```js
npm init -y
```

- Install express

```js
npm install express
```

- Create app.js or server.js file

```js
const express = require('express');

const app = express();
const PORT = 3000;

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,
                   and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
```

- Run the server

```js
node app.js
```

## Set up routes

```syntax
app.anyMethod(path, function)
```

### Setting GET request route on the root URL

```js
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,
                    and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
```

- Use app.get() to configure the route with the path '/' and callback function.
- The callback function receives req (request) and res(response) object provided by express.
- req is the incoming request object containing client data, and res is the response object used to send data back to the client.
- Use res.status() to set the HTTP status code before sending the response.
- Use res.send() to send the response back to the client. You can send a string, object, array, or buffer. Other response method includes res.json() for JSON object and res.sendFile() files.

### setting up get request route on the '/hello' path.

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (req, res)=>{
    res.set('Content-Type', 'text/html');
    res.status(200).send("<h1>Hello GFG Learner!</h1>");
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is
                      listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
```

- the `set()` function is used to set the HTTP header's content type as HTML. When the browser receives this response it will be interpreted as HTML instead of plain text.

### Setting route to be accessed by users to send data with post request.

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.post('/', (req, res)=>{
    const {name} = req.body;

    res.send(`Welcome ${name}`);
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and
                    App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
```

- The `express.json()` middleware is used to parse the incoming request object as a JSON object. The app. use() is syntax to use any middleware.
- `const {name}`, which is the syntax in ES6 to extract the given property/es from the object. Here we are extracting the name property that was sent by the user with this request object.

## Serving entire directory using middleware

- We use the middleware `express.static()` function, which takes two arguments.
- The first arguments is the absolute root path of the directory containing the files we want to serve.
- we can easily serve static files by using `app.use()` and providing the express.static() middleware.

**syntax**

```js
app.use(path, express.static(root, [options]));
```

**code**

```js
const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'Static Files')))


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,
                   and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);

```

> [!note]
>
> - here `Static Files` is directory name.
> - the join() method takes two parameter and join them as a path, in NodeJS we have a global attribute **\_\_dirname** which contains the path of the directory in which the current file exists.
> - you can see the file in `/static/index.html` or `/static/satoru.png` based on file in static files directory.

## Sending a single file on a route with the sendFile() function.

**Syntax**

```syntax
res.sendFile(fileUrl)
```

**code**

```js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "Static files/satoru.png"));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT,
    );
  else console.log("Error occurred, server can't start", error);
});
```

- we are creating a get request route on the '/file' path, the route send the satoru.png file to the user as an HTTP response.
