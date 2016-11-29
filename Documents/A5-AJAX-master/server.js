var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , qs   = require('querystring')
  , port = 8080

var movies=[];
var movieList=[];
// Add more movies! (For a technical challenge, use a file, or even an API!)
fs.readFile('movies.txt', function(err, data) {
    //if(err) throw err;
    movies = data.toString().split("\n");
    for(i in movies) {
        console.log(movies[i]);
    }
});
//var movies = ['Jaws', 'Jaws 2', 'Jaws 3', 'Doctor Strange', 'Big Fish', 'The Illusionist']

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    // Note the new case handling search
    case '/':
      sendFile(res, 'index.html');
      break;
    case '/index.html':
      sendFile(res, 'index.html');
      break
    case '/list':
      res.end(JSON.stringify(movies));
      break 
    case '/filter':
      res.end(JSON.stringify(movieList))
      break
    case '/search':
      handleSearch(req)
      res.end('testing search');
      break
    // Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
    case '/add':
      handleAdd(req);
      res.end('testing add');
      break
    case '/remove':
      handleRemove(req, res)
      res.end('testing remove');
      break
    case '/style.css':
      sendFancyFile(res, 'style.css', 'text/css')
      break
    case '/js/scripts.js':
      sendFancyFile(res, 'scripts.js', 'text/javascript')
      break
    case '/Readme.md':
      sendFancyFile(res, 'Readme.md', 'text/md')
      break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || port)
console.log('listening on 8080')

// subroutines

// You'll be modifying this function
function handleSearch(req) {
    var chunk = ""
    req.on('data', function(data) {
      chunk += data;
      console.log(chunk);
    })
    req.on('end', function(data) {
    // Note: this is not a great way to access this object.
      var obj = chunk.split('=');
      movieList=movies.filter(function(movie){return movie.match(obj[1])});
      console.log(movieList);
    }) 
  }

  function handleAdd(req) {
    var chunk = ""
    req.on('data', function(data) {
      chunk += data;
      console.log(chunk);
    })
    req.on('end', function(data) {
    // Note: this is not a great way to access this object.
      var obj = chunk.split('=');
      var same=0;
            for(i in movies)
            {
              if(obj[1].localeCompare(movies[i])==0)
              {
                same=1;
              }
            }
            if(same==0)
            {
              movies.push( obj[1] );
            }
    })
  }

  function handleRemove(req) {
    var chunk = ""
    req.on('data', function(data) {
      chunk += data;
      console.log(chunk);
    })
    req.on('end', function(data) {
    // Note: this is not a great way to access this object.
      var obj = chunk.split('=');
            for(i in movies)
            {
              if(obj[1].localeCompare(movies[i])==0)
              {
                movies.splice(i,1);
              }
            }
    })
  }

function sendFile(res, filename) {
  res.writeHead(200, {'Content-type': 'text/html'})

  var stream = fs.createReadStream(filename)

  stream.on('data', function(data) {
    res.write(data);
  })

  stream.on('end', function(data) {
    res.end();
    return;
  })
}

function sendFancyFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })
}