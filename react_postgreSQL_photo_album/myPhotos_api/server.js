const express = require('express');
const app = express();
// const fs = require('fs');
// const port = 3001;
const cors = require('cors');
const bcrypt = require('bcryptjs');
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const image = require('./controller/image')
const db = require('./db')


// ENV variables
require('dotenv').config()
const { PORT } = process.env
// console.log(HOST, USER, DB_NAME)
// const db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'itai',
//     password : '',
//     database : 'photo-app'
//   }
// });


db.select('*').from('users').then(data => console.log(data));

app.use(express.json());
app.use(cors());






// app.get('/', (req, res) => {
//   res.send(database.users);
// })
// we pass bcrypt & db to the function via dependence injection like so. 
// instead of importing them in function file (although that would work too).
app.post('/signin', (req, res) =>  signin.handleSignin(req, res, bcrypt, db))

/*
req e.g {
  name: '',
  email: '',
  password: '',
}
*/
// we pass bcrypt & db to the function via dependence injection like so. 
// instead of importing them in function file (although that would work too).
app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, db )) 
/* One way to use  Knex ".where" method is with an object e.g:
.where({
  id: id,
})
in ES6 syntax if the key and value are the same  so you can do it like this as well: (assume obj like example above)
.where({id})
*/
//  Another way of calling the function is like so:
app.get('/profile/:id', profile.profileHandlerGet(db));

app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res, db));


app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
});



