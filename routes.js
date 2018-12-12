const routes = require('next-routes')

module.exports = routes()
.add('index', '/')
.add('products', '/products')
.add('product', '/products/:uid')
.add('bloghome', '/blog')
.add('blogpost', '/blog/:uid')
.add('notfound', '/*')
