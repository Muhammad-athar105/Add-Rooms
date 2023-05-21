const jwt = require('jsonwebtoken');
require('dotenv').config();
const accessTokenSecret = process.env.JWT_SECRET
const User = require('../models/User');

const login = async (req,res) => {
  try{
    let user = await User.findOne({ email: req.body.email },{_id:1,name:1,email:1,role:1,password:1});
    if(user?.password == req.body.password){ // replace password checking with crypt algo.

      //create jwt
      let accessToken = jwt.sign({_id:user._id,name:user.name},accessTokenSecret);

      let user_data = {
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        accessToken
      }

      res.status(200).json({ status: 200, data: user_data, message: 'User logged in' });
    }else{
      res.status(404).json({ status: 404, data: [], message: 'Invalid email or password' });
    }
    
  }
  catch(e){
    res.status(500).json({ status: 500, data: [], message: e.message });
  }
  
  
}
 
const signup = async(req, res) => {

  try
  {
    const user = new User(req.body); // Note: hash password before save using crypt algorithm.
    await user.save();
    res.json({ status: 200, data: user, message: 'User has been created successfully!' });
  }
  catch (e) {
    res.status(500).json({ status: 500, data: [], message: e.message });
  }
    
}

module.exports = {login,signup}