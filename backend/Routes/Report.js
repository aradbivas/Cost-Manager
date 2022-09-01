const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/check-auth')
const {addItem, getItemsByMonthAndYear} = require('../Controllers/ReportController')
router.use(requireAuth)

//get reports by year and month
router.get('/getReport/:year/:month', getItemsByMonthAndYear)


//get reports by year


//get reports by month


//delete report



//update report


//add report
router.post('/addItem', addItem)

module.exports = router;

