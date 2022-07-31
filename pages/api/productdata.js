const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
async function getProduct(req, res) {
  try {
    const x = req.headers.infogroup
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let product = await db.collection(x).find({}).toArray();
    // return the posts
    return res.json({
      message: JSON.parse(JSON.stringify(product)),
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
export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getProduct(req, res);
    }
  }
}
