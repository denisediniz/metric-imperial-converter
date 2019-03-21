'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expect = require('chai').expect;
const helmet = require('helmet');
const runner = require('./run-tests');

const apiRoutes = require('./routes/api.js');

const app = express();

app.use(helmet());

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); // for testing

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start server and tests
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      }catch(err){
        console.log('Tests are not valid:');
        console.log(err);
      }
    }, 2000);
  }
});

module.exports = app; // for testing
