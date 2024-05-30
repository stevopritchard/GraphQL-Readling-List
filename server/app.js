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

app.all('/graphql', createHandler({ schema }));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(process.env);
  console.log(`Now listening for requests on port ${port}!`);
});
