const express  = require('express');
const router = express.Router();

// import room controller
const {index,create,edit,update,destroy} = require('./../app/controllers/RoomController');
router.get('/',index);
router.post('/create', create);
router.get('/edit/:id', edit);
router.put('/update', update);
router.delete('/delete/:id', destroy);
module.exports = router;