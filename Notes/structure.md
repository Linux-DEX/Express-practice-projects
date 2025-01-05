# How to Structure Expressjs app

## Basic or Medium level project

### Create Node Project:

- **Step 1**: Initialize a node project, write the command below in you terminal

```js
npm init
```

- **Step 2**: Install packages

```js
npm install express
```

- **Step 3**: Create an app.js file. In this file, we write the entire code of the server.

```js
touch app.js
```

### project structure:

After all this , our project structure will look like this.

```txt
> node_modules
- app.js
- package-lock.json
- package.json
```

### Configure environment variable:

```js
npm install dotenv
```

& add PORT=8000 in .env

```txt
> node_modules
- .env
- app.js
- package-lock.json
- package.json
```

### Structure of app.js file

**app.js**

```app.js
// 3rd Party Modules
const express = require('express');
require('dotenv/config');

// Local Modules
const myRoute = require('./routes/myRoute.js');

// Server Initialization
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());

// Routes will be written here
app.use('/route', myRoute);
// Server Listen Along with Database
// connection(in case of data persistence)
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,
                   and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);
```

### Setting up Controllers and Route

```txt
> node_modules
> controllers
    myController.js
> routes
    myRoute.js
- .env
- app.js
- package-lock.json
- package.json
```

**myController.js**

```myController.js
// Methods to be executed on routes
const method1 = (req, res)=>{
    res.send("Hello, Welcome to our Page");
}

const method2 = (req, res)=>{
    res.send("Hello, This was a post Request");
}

// Export of all methods as object
module.exports = {
    method1,
    method2
}
```

**myRoute.js**

```myRoute.js
// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const myController = require('../controllers/myController');

// Initialization
const router = Router();

// Requests
router.get('/', myController.method1);
router.post('/', myController.method2);

module.exports = router;
```

### Step to run the application

```js
node app.js
```
