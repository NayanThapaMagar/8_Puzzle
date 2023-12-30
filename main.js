/* eslint-disable linebreak-style */
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
// const cors = require('cors');
// import
// const privateRoute = require('../routes/private_routes');
const route = require('./router/route');

const app = express();
const port = 4000;

// app.use(
//   cors({
//     origin: '*',
//     credentials: true,
//   }),
// );

// app.use(
//   cors({
//     origin: '*',
//     credentials: true,
//   }),
// );
// create application/json parser
// app.use(express.json({ limit: '500mb' }));
app.use(express.json());
// routes
app.use('/', route);
// app.use('/api', privateRoute);

app.listen(port, () => console.log("server at ", port));