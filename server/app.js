import express from 'express';
import 'dotenv/config';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema/schema.js';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING); //using mongoose to connect to my bucket via the connection string passed to this method
mongoose.connection.once('open', () => {
  console.log('Connected to database!');
});

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.all('/graphql', createHandler({ schema }));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Now listening for requests on port ${port}!`);
});
