# Unique features of Express JS

## Routing

- Routing is the process of handling an HTTP request that defines which kind of response will be sent to the client on which particular request.
- In Node js, we have a module called http to create a server, where we create a server using `htte.createServer` and pass a callback function to http.createServer, where wee get requests and response as a parameter and using if else and URL, we setup routes.

Node JS:

```js
if (method === "GET" && url === "/") {
  res.end("Hello, World!");
}
```

While in Express JS, routing and creating servers is an inbuilt feature, we don't need to setup if else statements to setup routes. We can directly use the simple methods of Express JS to setup routes.

Express JS:

```js
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
```

## Middlewares

- Middlewares are the middle processes that execute between processes.
- In terms of web development, when we store passwords in a database using a server, we use middleware to encrypt our passwords to make them secure.
- But Node JS does not contain any middleware by default, but we can create our own custom middleware in it.
- Instead of Node JS, Express.js contains built-in middleware like express.static() to server static files to clients.

Syntax:

```js
app.use(express.static("public"));
```

## Error Handling

- Error handling is used to ensure the smooth running of your software or program in case of any undetected issue in your software.
- But in Node JS, there is no way to handle errors automatically through any module.
- Developers can setup error handling using try catch blocks or event emitters.
- But in Express JS, it is much easier to handle errors because there are multiple ways to handle errors, like asynchronous handling, global error handling, etc.

Syntax:

```js
throw new Error("Error");
```

## Request & Response Object

Request and Response means what is requested by the client side and, in exchange for that request, what data is sent to the client side from the server side in terms of response. The request and response object is contained in both Node JS and Express JS, but still, Express JS comes with multiple additional functionalities in this object. For example, Express JS allows developers to use parameters to access URLs, and res.send() is a much more convenient way to send responses. It also allows user middlewares to be used in server-side coding.

Syntax:

```js
app.get("/", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  res.send("Hello, World!");
});
```

## Body Parsing

Body parsing refers to parsing data sent from the client side to the server side. The client sent data in the body of the request and also sent the type of content in headers, so converting data according to the content type is called body parsing. In Node.js, there is no built-in method or function to parse client-side data, but we can use modules like querystring or buffer. But Express JS contains built-in modules to parse data without any external modules like middleware or Express. json() Parsing.

Syntax:

```js
app.use(express.json());
```
