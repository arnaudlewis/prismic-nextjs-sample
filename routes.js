const routes = require('next-routes')

module.exports = routes()
.add('index', '/')
.add('page', '/page/:uid')
.add('preview', '/preview')
.add('404', '*')
