const express=require('express');
const router = express.Router();

const getController=require('../controllers/logincontrollers')
// const postController=require('../controllers/logincontrollers')

router.get('/delete/:id', getController.getDelete)
// router.post('/edit',postController.postEdit)




  module.exports = router;