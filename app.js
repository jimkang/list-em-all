var qs = require('qs');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();
var intersection = require('lodash.intersection');
var loadList = require('./load-list');
var render = require('./render');

((function go() {
  route();
})());

function parseRoute() {
  // Skip the # part of the hash.
  return qs.parse(window.location.hash.slice(1));
}

function route() {
  var routeDict = parseRoute();
  if ('dataURL' in routeDict) {
    loadList({url: routeDict.dataURL}, sb(arrangeRender, handleError));
  }
}

function updateTags(tag) {
  var routeDict = parseRoute();
  routeDict.tags = tag;
  window.location.hash = qs.stringify(routeDict);
  arrangeRender();
}

function arrangeRender(allThings) {
  var routeDict = parseRoute();
  var tags = routeDict.tags;
  var thingsToRender = allThings;

  if (tags) {
    tags = tags.split(',');
    thingsToRender = allThings.filter(hasTags);
  }
  render({
    thingData: thingsToRender,
    thingClass: 'thing',
    rootId: 'things-root',
    onTagClick: updateTags
  });

  function hasTags(thing) {
    var commonTags = intersection(thing.tags, tags);
    return commonTags.length > 0;
  }  
}
