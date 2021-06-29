
const MongoClient = require('mongodb').MongoClient;  // help us to connect to the mongodb server

const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

//Accessing the server
MongoClient.connect(url,(err,client) => {
    
    assert.equal(err,null); // assert is used to check the error

    console.log("Connected correctly to the server");

    const db = client.db(dbname);

    dboper.insertDocument(db,{name: "Cold Coffee",description: "Cold one with Ice Cream"},"dishes",(result) => {
        console.log("Insert Document:\n",result.ops);

        dboper.findDocuments(db,"dishes",(docs) => {
            console.log("Found Documents:\n",docs);

            dboper.updateDocument(db,{name: "cold coffee"}, {description: "taste updated"}, "dishes", (result) => {
                console.log("updated documnet:\n",result.result);

                dboper.findDocuments(db,"dishes",(docs) => {
                    console.log("Found Documents:\n",docs);
                    
                    db.dropCollection("dishes",(result) => {
                        console.log("Dropped collection: ",result);
                        client.close();
                    });
                });
            });
        });
    });
});