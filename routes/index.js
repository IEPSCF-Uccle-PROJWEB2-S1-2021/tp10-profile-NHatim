const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {

  if(!req.body.nom){
    req.body.nom = 'Utilisateur anonyme';
  }

  res.render('index', { title: req.body.nom, phrase : 'Bonjour'});
});




module.exports = router;
