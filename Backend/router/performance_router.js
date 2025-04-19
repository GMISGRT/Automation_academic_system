// performanceRouter.js
const express = require('express');
const router = express.Router();

const { getPerformanceReports } = require('../controller/performance_controller.js');

router.get('/performance', getPerformanceReports);

module.exports = router;