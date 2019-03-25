const mongoose = require('mongoose'), // The mongoose module
      Schema = mongoose.Schema,
      State = require('./state');


const OrderSchema = new Schema({
  product  : { type : String, required: true, trim: true },
  price    : { type : Number },
  quantity : { type : Number }
});

//This is how the data is going to be stored in the database and how the fields are going to be laid out.
const CustomerSchema = new Schema({
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },
  email       : { type : String, required: true, trim: true },
  address     : { type : String, required: true, trim: true },
  city        : { type : String, required: true, trim: true },
  stateId     : { type : Number, required: true },
  state       : State.schema ,
  zip         : { type : Number, required: true },
  gender      : { type : String },
  orderCount  : {  type : Number },
  orders      : [ OrderSchema ], 
});

//Over it will take this schema above and it will create query in the 'customers' collection inside the database using
// the mongoose model that we declared above. --Refer next to CustomersRepository
module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
