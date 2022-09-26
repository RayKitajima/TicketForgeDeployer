
var path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'../docs/lib'),
		filename: 'ticketforge.js',
		library: 'TicketForge',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
