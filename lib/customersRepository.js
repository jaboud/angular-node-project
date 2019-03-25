const mongoose = require('mongoose'), // imports mongoose module
      Schema = mongoose.Schema,
      Customer = require('../models/customer'); // This will import  our customer model

class CustomersRepository {


   // Our libaries of moodules has a customer repository and we could do things like:

   // Get Customers
    getCustomers(callback) {
        //This gets the count of the customers
        console.log('*** CustomersRepository.getCustomers');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            // After getting the count of the customers, it will find them by using the customer.js model
            Customer.find({}, (err, customers) => {
                if (err) { 
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count, //This counts the customers.
                    customers: customers //This grabs the customer data of arrays.
                });
            });

        });
    }

    getPagedCustomers(skip, top, callback) {
        console.log('*** CustomersRepository.getPagedCustomers');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Customers count: ${count}`);

            Customer.find({})
                    .sort({lastName: 1})
                    .skip(skip)
                    .limit(top)
                    .exec((err, customers) => {
                        if (err) { 
                            console.log(`*** CustomersRepository.getPagedCustomers error: ${err}`); 
                            return callback(err); 
                        }
                        callback(null, {
                            count: count,
                            customers: customers
                        });
                    });

        });
    }

    
    getCustomersSummary(skip, top, callback) {
        console.log('*** CustomersRepository.getCustomersSummary');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1 })
                    .skip(skip)
                    .limit(top)
                    .exec((err, customersSummary) => {
                        callback(null, {
                            count: count,
                            customersSummary: customersSummary
                        });
                    });

        });
    }

    //Returns customers data
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id, (err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository.getCustomer error: ${err}`); 
                return callback(err); 
            }
            callback(null, customer);
        });
    }

    

    //Inserts customer data into the database
    insertCustomer(body, state, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        console.log(state);
        let customer = new Customer();
        let newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        customer.firstName = body.firstName;
        customer.lastName = body.lastName;
        customer.email = body.email;
        customer.address = body.address;
        customer.city = body.city;
        customer.state = newState;
        customer.stateId = newState.id;
        customer.zip = body.zip;
        customer.gender = body.gender;

        customer.save((err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository insertCustomer error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, customer);
        });
    }


//Updates Customer Customer Data within the data base
    updateCustomer(id, body, state, callback) {
        console.log('*** CustomersRepository.editCustomer');

        let stateObj = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        Customer.findById(id, (err, customer)  => {
            if (err) { 
                console.log(`*** CustomersRepository.editCustomer error: ${err}`); 
                return callback(err); 
            }

            customer.firstName = body.firstName || customer.firstName;
            customer.lastName = body.lastName || customer.lastName;
            customer.email = body.email || customer.email;
            customer.address = body.address || customer.address;
            customer.city = body.city || customer.city;
            customer.state = stateObj;
            customer.stateId = stateObj.id;
            customer.zip = body.zip || customer.zip;
            customer.gender = body.gender || customer.gender;


            customer.save((err, customer) => {
                if (err) { 
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, customer);
            });

        });
    }

    // Deletes tcustomer data in database 
    deleteCustomer(id, callback) {
        console.log('*** CustomersRepository.deleteCustomer');
        Customer.remove({ '_id': id }, (err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository.deleteCustomer error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, customer);
        });
    }

}

module.exports = new CustomersRepository();