
const MongoClient = require('mongodb').MongoClient;  // help us to connect to the mongodb server

const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = "conFusion";

//Accessing the server
MongoClient.connect(url,(err,client) => {
    
    assert.equal(err,null); // assert is used to check the error

    console.log("Connected correctly to the server");

    const db = client.db(dbname);  // connect to the database

    const collection = db.collection('dishes');  // collection name: dishes

    collection.insertOne({"name": "Dosa", "description": "tastes good"}, (err,result) => {
        assert.equal(err,null);

        console.log("After insertion:\n");
        console.log(result.ops); //ops: operation(inserted in number)

        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection('dishes',(err,result) => {
                assert.equal(err,null);

                client.close();  // closing the connection
            });
        });
    });

});