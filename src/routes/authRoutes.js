const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('../models/User')

const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
   try {
      const user = new User(req.body)
      await user.save();
      // res.send('Successfuly created user')

      const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');

      res.send({ token: token })
   } catch (error) {
      res.status(422).send("Hata : " + error)
   }
});

router.post('/signin', async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(422).send('Please provide an email and password');
   }

   const user = await User.findOne({ email: email });

   if (!user) {
      return res.status(404).send('Email not found')
   }
   try {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
      res.send({ token })
   } catch (error) {
      return res.status(422).send({ error: 'Please check your email and password' })
   }
})

module.exports = router;