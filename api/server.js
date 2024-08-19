const jsonServer = require('json-server')

const server = jsonServer.create()

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