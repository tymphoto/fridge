const router = require('express').Router();
const bcrypt = require('bcrypt');

router.route('/')
  .get(async (req, res) => {
    res.render('index');
  });

module.exports = router;
