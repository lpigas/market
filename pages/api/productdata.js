const { connectToDatabase } = require("../../lib/mongodb");
const ObjectId = require("mongodb").ObjectId;
async function getProduct(req, res) {
  try {
    const group = req.headers.infogroup;
    const limit = +req.headers.limit;
    const page = +req.headers.page;
    const start = page * limit - limit + 1;
    const end = start + limit - 1;

    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let product;
    let fulllength = await db.collection(group).find({}).toArray();
    if (page === 1) {
      product = await db.collection(group).find({}).limit(limit).toArray();
    } else {
      product = await db
        .collection(group)
        .find({ id: { $gte: start, $lte: end } }, {})
        .limit(limit)
        .toArray();
    }
    // return the posts
    return res.json({
      message: {
        data: JSON.parse(JSON.stringify(product)),
        fulllength: JSON.parse(JSON.stringify(fulllength)).length,
      },
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
