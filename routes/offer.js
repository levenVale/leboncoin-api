// import packages
const express = require("express");
const app = express();
const router = express.Router();

const cors = require("cors");
app.use(cors());

const formidableMiddleware = require("express-formidable");
const server = express();
server.use(formidableMiddleware);

// import model and middleware
const Offer = require("../models/Offer");
const isAuthenticated = require("../middleware/isAuthenticated");

// import setup cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// CREATE post route
router.post("/offer/publish", isAuthenticated, async (req, res) => {
  try {
    let obj = {
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      pictures: [],
      created: new Date(),
      creator: req.user
    };
    const files = req.files.files;

    if (files) {
      if (files.length > 1) {
        // if there are multiple pictures
        const pictures = [];
        const files = Object.keys(req.files.files);
        const results = {};
        files.forEach(fileKey => {
          cloudinary.uploader.upload(
            req.files.files[fileKey].path,
            {
              folder: "leboncoin-api"
            },
            async (error, result) => {
              if (error) {
                results[fileKey] = {
                  success: false,
                  error: error
                };
              } else {
                results[fileKey] = {
                  success: true,
                  result: result
                };
              }
              if (Object.keys(results).length === files.length) {
                for (let i = 0; i < Object.keys(results).length; i++) {
                  pictures.push(results[i].result.secure_url);
                }
                obj.pictures = pictures;
                const newPost = await new Offer(obj);
                await newPost.save();
              }
            }
          );
        });
      } else {
        // if there is only one picture
        cloudinary.uploader.upload(
          files.path,
          {
            folder: "leboncoin-api"
          },
          async (error, result) => {
            if (error) {
              return res.json({ error: error.message });
            } else {
              obj.pictures = result.secure_url;
              const newPost = new Offer(obj);
              await newPost.save();
            }
          }
        );
      }
    } else {
      // if there is no picture
      const newPost = new Offer(obj);
      await newPost.save();
    }
    res.json({ message: "Offer published!" });
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
});

// READ post route
const createFilters = req => {
  const filters = {};
  if (req.query.priceMin) {
    filters.price = {};
    filters.price.$gte = req.query.priceMin;
  }
  if (req.query.priceMax) {
    if (!filters.price) {
      filters.price = {};
    }
    filters.price.$lte = req.query.priceMax;
  }
  if (req.query.title) {
    filters.title = new RegExp(req.query.title, "i");
  }
  return filters;
};

router.get("/offer/with-count", async (req, res) => {
  try {
    const filters = createFilters(req);
    const search = Offer.find(filters);

    if (req.query.sort === "price-asc") {
      search.sort({ price: 1 });
    } else if (req.query.sort === "price-desc") {
      search.sort({ price: -1 });
    } else if (req.query.sort === "date-desc") {
      search.sort({ date: -1 });
    } else if (req.query.sort === "date-asc") {
      search.sort({ date: 1 });
    }

    if (req.query.page) {
      const page = req.query.page;
      const limit = 3;

      search.limit(limit).skip(limit * (page - 1));
    }

    const products = await search;
    res.json(products);
  } catch (error) {
    res.json(error.message);
  }
});

// READ post by id route
router.get("/offer/:_id", async (req, res) => {
  try {
    const find = await Offer.findById(req.params._id).populate("creator");

    const offers = await Offer.find({
      creator: find.creator.id
    });

    const product = {
      _id: find._id,
      title: find.title,
      description: find.description,
      price: find.price,
      pictures: find.pictures,
      creator: {
        account: {
          username: find.creator.account.username,
          phone: find.creator.account.phone
        },
        _id: find.creator.id,
        offers: offers.length
      },
      created: find.created
    };
    res.json(product);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
