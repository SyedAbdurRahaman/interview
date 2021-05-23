const express=require('express');
const router = express.Router();
const path=require('path');

const getController=require('../controllers/logincontrollers')
const postController=require('../controllers/logincontrollers')



// (req, res) => {
//     // res.sendFile(__dirname + '/welcome.html')
//     res.sendFile(path.join(__dirname ,'../','welcome.html'));

//   })
router.get('/result', getController.getResult)
router.post('/result',postController.postResult)


  module.exports = router;