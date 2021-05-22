const express=require('express');
const router = express.Router();
const path=require('path');

const getController=require('../controllers/logincontrollers')
const postController=require('../controllers/logincontrollers')

router.get('/edit/:id', getController.getEdit)
router.post('/edit',postController.postEdit)




  module.exports = router;