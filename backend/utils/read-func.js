const fsPromises = require('fs').promises;

const reader = (pathUrl) => fsPromises.readFile(pathUrl, { encoding: 'utf8' })
  .then((file) => JSON.parse(file));

module.exports = reader;
