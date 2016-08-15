var fs = require('fs');

module.exports = {
  write: function(data, filename) {
      var stream = fs.createWriteStream(filename);
      stream.write(new Buffer(data, 'base64'));
      stream.end();
  }
};
