const express = require('express');
const router = new express.Router();

/* GET users listing. */
router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
});

module.exports = router;
