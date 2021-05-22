const express=require('express');
const router = express.Router();
const path=require('path');

const getController=require('../controllers/logincontrollers')
const postController=require('../controllers/logincontrollers')


router.get('/welcome', getController.getHome)
// (req, res) => {
//     // res.sendFile(__dirname + '/welcome.html')
//     res.sendFile(path.join(__dirname ,'../','welcome.html'));

//   })
router.get('/add', getController.getAdd)
router.post('/save',postController.postAdd)


  module.exports = router;