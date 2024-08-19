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


// Obtener la URL base
server.get('/api', (req, res) => {
    const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}/api` 
        : `${req.protocol}://${req.get('host')}/api`;

    const endpoints = {
        destinations: `${baseUrl}/destinations`,
        crew: `${baseUrl}/crew`,
        technology: `${baseUrl}/technology`
    };
    res.json(endpoints);
});

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use('/api',router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server