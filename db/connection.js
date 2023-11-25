const ENV = process.env.NODE_ENV || 'dev';
const mongoose = require("mongoose");
require('dotenv').config({
  path: `${__dirname}/../${ENV}.env`,
});
console.log(process.env)
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI not set');
}

module.exports = mongoose.connect(
  process.env.MONGODB_URI, 
  {
    useUnifiedTopology: true
  }
);
