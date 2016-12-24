var request = require('basic-browser-request');
// var YAML = require('yamljs');
var sb = require('standard-bail')();

function loadList(url, loadDone) {
  var reqOpts = {
    url: url,
    method: 'GET'
  };
  request(reqOpts, sb(parseFile, loadDone));
}

function parseFile(res, body, done) {
  // var parsed = YAML.parse(body);
  var parsed = jsyaml.load(body);
  done(null, parsed);
}

module.exports = loadList;
