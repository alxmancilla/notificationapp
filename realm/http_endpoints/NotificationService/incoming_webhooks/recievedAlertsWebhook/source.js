// This function is the webhook's request handler.
exports = function(payload, response) {
    // Data can be extracted from the request as follows:

    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = payload.headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const body = payload.body;

    // console.log("arg1, arg2: ", arg1, arg2);
    console.log("Content-Type:", JSON.stringify(contentTypes));
    console.log("Request body:", JSON.stringify(body));
    console.log("Request body text:", body.text());

    // You can use 'context' to interact with other Realm features.
    // Accessing a value:
    // var x = context.values.get("value_name");

    // Accessing a mongodb service:
    const coll = context.services.get("mongodb-atlas").db("alerts").collection("alert_collection");

    // Insert the alert to the database
    coll.insertOne(JSON.parse(body.text()))
      .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
      .catch(err => console.error(`Failed to insert item: ${err}`))

    // You can optionally send a response 
};