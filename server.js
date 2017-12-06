const express = require('express');
const app = express();
const port = 3001;

(function(){
app.use((request, response, next) => {
  console.log(request.headers);
  next();
});

app.use((request, response, next) => {
  request.chance = Math.random();
  next();
});

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

//app.get('/', (request, response) => {
 // throw new Error('oops')
//})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err);
  response.status(500).send('Something broke!');
});

app.listen(port);

  //console.log(`server is listening on ${port}`)
})();
