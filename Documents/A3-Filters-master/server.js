var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080

// Add more movies! (For a technical challenge, use a file, or even an API!)
var movies = ['Jaws', 'Jaws 2', 'Jaws 3', 'Doctor Strange', 'Big Fish', 'The Illusionist']

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    // Note the new case handling search
    case '/search':
      handleSearch(res, uri)
      break
    // Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
    case '/':
      sendIndex(res)
      break
    case '/index.html':
      sendIndex(res)
      break
    case '/style.css':
      sendFile(res, 'style.css', 'text/css')
      break
    case '/js/scripts.js':
      sendFile(res, 'scripts.js', 'text/javascript')
      break
    case '/Readme.md':
      sendFile(res, 'Readme.md', 'text/md')
      break
    default:
      res.end('404 not found')
  }

})

server.listen(process.env.PORT || port)
console.log('listening on 8080')

// subroutines

// You'll be modifying this function
function handleSearch(res, uri) {
  var contentType = 'text/html'
  res.writeHead(200, {'Content-type': contentType})

  if(uri.query) {
    // PROCESS THIS QUERY TO FILTER MOVIES ARRAY BASED ON THE USER INPUT
    console.log( uri.query )
    
    var queryValue=uri.query.split("=")
    var q=queryValue[1].replace("+", " ")
    var movieList=movies.filter(function(movie){return movie.match(q)})
    var contentType = 'text/html'
    console.log(q)
     , html = ''

    html = html + '<html>'

    html = html + '<head>'
    html = html + '<meta charset="utf-8">'
    html = html + '<meta name="viewport" content="width=device-width, initial-scale=1">'
    html = html + '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">'
    html = html + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>'
    html = html + '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'
    html = html + '<link rel="stylesheet" type="text/css" href="style.css"/>'
    html = html + '</head>'

    html = html + '<body>'
    html = html + '<h1>Movie Search!</h1>'

    // Here's where we build the form YOU HAVE STUFF TO CHANGE HERE
    html = html + '<form action="search" method="GET">'
    html = html + '<input type="text" name="test" />'
    html = html + '<button type="submit">Search</button>'
    html = html + '</form>'

    html = html + '<ul>'
    // Note: the next line is fairly complex. 
    // You don't need to understand it to complete the assignment,
    // but the `map` function and `join` functions are VERY useful for working
    // with arrays, so I encourage you to tinker with the line below
    // and read up on the functions it uses.
    //
    // For a challenge, try rewriting this function to take the filtered movies list as a parameter, to avoid changing to a page that lists only movies.
    html = html + movieList.map(function(d) { return '<li>'+d+'</li>' }).join(' ')
    html = html + '</ul>'

    html = html + '</body>'
    html = html + '</html>'
  
    res.writeHead(200, {'Content-type': contentType})
    res.end(html, 'utf-8')
    }
    else {
     res.end('no query provided')
    }
  }

// Note: consider this your "index.html" for this assignment
function sendIndex(res) {
  var contentType = 'text/html'
    , html = ''

  html = html + '<html>'

  html = html + '<head>'
  html = html + '<meta charset="utf-8">'
  html = html + '<meta name="viewport" content="width=device-width, initial-scale=1">'
  html = html + '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">'
  html = html + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>'
  html = html + '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'
  html = html + '<link rel="stylesheet" type="text/css" href="style.css"/>'
  html = html + '</head>'

  html = html + '<body>'
  html = html + '<h1>Movie Search!</h1>'

  // Here's where we build the form YOU HAVE STUFF TO CHANGE HERE
  html = html + '<form action="search" method="GET">'
  html = html + '<input type="text" name="test" />'
  html = html + '<button type="submit">Search</button>'
  html = html + '</form>'

  html = html + '<ul>'
  // Note: the next line is fairly complex. 
  // You don't need to understand it to complete the assignment,
  // but the `map` function and `join` functions are VERY useful for working
  // with arrays, so I encourage you to tinker with the line below
  // and read up on the functions it uses.
  //
  // For a challenge, try rewriting this function to take the filtered movies list as a parameter, to avoid changing to a page that lists only movies.
  html = html + movies.map(function(d) { return '<li>'+d+'</li>' }).join(' ')
  html = html + '</ul>'

  html = html + '</body>'
  html = html + '</html>'
  
  res.writeHead(200, {'Content-type': contentType})
  res.end(html, 'utf-8')
}

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}
