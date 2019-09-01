const express = require('express');
const router = express.Router();
const sponsorsController = require('../controllers/sponsors');

router.get('/', sponsorsController.getSponsors)

router.get('/:id', sponsorsController.getSponsorById)

router.post('/', sponsorsController.createSponsor)

router.put('/:id', sponsorsController.updateSponsorById)

router.delete('/:first_name', sponsorsController.deleteSponsorByUsername)

module.exports = router;

