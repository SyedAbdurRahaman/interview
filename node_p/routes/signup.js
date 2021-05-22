const express=require('express');
const router=express.Router();



const getController=require('../controllers/logincontrollers');
const postController=require('../controllers/logincontrollers')

router.get('/signupp',getController.getSignup);


router.post('/sa',postController.postSignup)


 module.exports = router;