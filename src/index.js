


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(todoRoutes);

const mongoUri = 'mongodb+srv://admin:acanakdas@mern-todo-app.aybpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
   // useFindAndModify: true,

});

mongoose.connection.on('connected', () => {
   console.log('Connected to mongo db');
});
mongoose.connection.on('error', (err) => {
   console.log('Error while connecting to mongo : ' + err);
})


app.get('/', requireAuth, (req, res) => {
   res.send('You are : ' + req.user);
});

app.listen(3000, () => {
   console.log('Listening on port 3000');
});