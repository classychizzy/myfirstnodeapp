/* a server is first created*/

const express = require('express');
const app = express();
app.get('/myfirstproject', (req,res)=>{
   res.send("server is running") ;
});
app.listen(3000, ()=>console.log('app is listening on port 3000'));
// time to register the user model with the application, using helpers
const Model = require('./models/user');/* this comes before the routes as we need
the users to be able to access the routes*/
 app.use(require('./routes')); //middleware for handling routes