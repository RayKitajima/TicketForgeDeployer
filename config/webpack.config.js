
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'../docs/lib'),
		filename: 'ticketforge.dev.js',
		library: 'TicketForge',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
