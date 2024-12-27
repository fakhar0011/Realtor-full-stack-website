const express = require("express");
const router = express.Router();
const wrapAsyncF = require("../utils/wrapAsyncf.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsyncF(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsyncF(listingController.creatListing)
  );
// //NEW ROUTE///
router.get("/new", isLoggedIn, listingController.renderNewForm);
router
  .route("/:id")
  .get(wrapAsyncF(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),

    // validateListing,
    wrapAsyncF(listingController.updatListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsyncF(listingController.destroyListing));

// EDIT ROUTE///
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsyncF(listingController.renderEditForm)
);
module.exports = router;
