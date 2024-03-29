'use strict'

var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    argv = require('yargs').argv,
    routes = require('./routes/routes.js'),
    http = require('http'),
    debug = require('debug')('food-server:server'),
    socketHandler = require ('./socket/socket.js'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require ('passport'),
    cors = require('cors');

/**
*  Connect to database.
*/
require ('./db/db.js')();
require ('./facebook.js');

var CHAT_EVENT = 'chat';


var ports = {
  dev: process.env.PORT || 3000,
  playground: 8989
};

var env = argv.env || 'dev',
    port = ports[env];

var webpackConfig = require('./webpack.config.' + env),
    compiler = webpack(webpackConfig),
    app = express();

app.use(cors());

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(session({secret: 'shh'}));
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.set('port', port);

app.use(function(req, res, next) {
    //var sess = req.session;
    if((req.url === '/login'))
    {
      next();
    }
    else if(req.user)
      next();
    else
      res.redirect('/login');   
  });

/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
* Create socket.
*/
var io = require('socket.io')(server);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

io.on('connection', function (socket){
  debug('connected');
  socket.on (CHAT_EVENT, function (msg){
    socketHandler.chat (msg, function (err, newMessage){
      if (err)
        debug ('Could not handle chat message');
      else
        io.emit (CHAT_EVENT, newMessage);
    });
  });
   socket.on('disconnect', function(){
    debug('user disconnected');
  });
});


/* YOLO functions below */
/******************************************************************************/

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
