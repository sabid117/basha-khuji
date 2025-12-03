const express = require('express');
const router = express.Router();
const { createListing, getListings } = require('../controllers/listingController');

router.post('/listings', createListing);
router.get('/listings', getListings);

module.exports = router;
