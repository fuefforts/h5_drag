module.exports = {
	port: 4000,
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/quark',
		options: {}
	},
	middleware:['handlerError'],
	jwt: {secret: 'huangwei9527'},
	crypto: {secret: '#*#*huangwei9527*#*#'},
	baseUrl: ''
}
