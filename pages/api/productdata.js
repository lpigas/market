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
async function updateProduct(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    let cartProducts = JSON.parse(req.body);
    for (let i = 0; i < cartProducts.length; i++) {
      await db.collection(cartProducts[i].group).updateOne(
        {
          _id: new ObjectId(cartProducts[i]._id),
        },
        {
          $set: {
            leftovers: +cartProducts[i].leftovers - +cartProducts[i].pcs,
          },
        }
      );
    }

    // return a message
    return res.json({
      message: "all good",
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

async function putnewProduct(req, res) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // add the post
    let collections = JSON.parse(req.body).group;
    await db.collection(collections).insertOne(JSON.parse(req.body));
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
      return getProduct(req, res);
    }
    case "PUT": {
      return updateProduct(req, res);
    }
    case "POST": {
      return putnewProduct(req, res);
    }
  }
}
