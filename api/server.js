// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')

const server = jsonServer.create()

// Uncomment to allow write operations
// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('db.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)

// Comment out to allow write operations
const router = jsonServer.router('data.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)


server.get('/api', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host') + '/api';
    const endpoints = {
      destinations: `${baseUrl}/destinations`,
      crew: `${baseUrl}/crew`,
      technology: `${baseUrl}/technology`
    };
    res.json(endpoints);
  });
  
  // Rewrite the API routes
  server.use(jsonServer.rewriter({
    '/api/destinations': '/destinations',
    '/api/crew': '/crew',
    '/api/technology': '/technology'
  }));


server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server