var YAML = require('yamljs');

var request = require('basic-browser-request');
var sb = require('standard-bail')();

function loadList(opts, loadDone) {
  var yamlParseFn;
  var url;

  if (opts) {
    yamlParseFn = opts.yamlParseFn;
    url = opts.url;
  }

  if (!yamlParseFn) {
    yamlParseFn = YAML.parse;
  }

  var reqOpts = {
    url: url,
    method: 'GET'
  };
  request(reqOpts, sb(parseFile, loadDone));

  function parseFile(res, body, done) {
    // var parsed = jsyaml.load(body);
    var parsed = yamlParseFn(body);
    done(null, parsed);
  }
}

module.exports = loadList;
