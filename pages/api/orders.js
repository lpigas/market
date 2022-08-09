const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
async function getOrders(req, res) {
  try {
    let date = JSON.parse(JSON.stringify(req.headers)).infodate;

    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let orders = await db.collection("orders").find({ date: { $regex: date } }).toArray();
    // return the posts
    return res.json({
      // message: JSON.parse(JSON.stringify(product)),
      message: orders,
      success: true,
    });
  } catch (error) {
    // return the error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
async function putOrders(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    await db.collection("orders").insertOne(JSON.parse(req.body));
    // return a message
    return res.json({
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getOrders(req, res);
    }
    case "POST": {
      return putOrders(req, res);
    }
  }
}
