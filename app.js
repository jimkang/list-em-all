var qs = require('qs');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();
var d3 = require('d3-selection');
var accessor = require('accessor');
var intersection = require('lodash.intersection');
var loadList = require('./load-list');

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
    loadList(routeDict.dataURL, sb(arrangeRender, handleError));
  }
}

function arrangeRender(allThings) {
  var routeDict = parseRoute();
  var tags = routeDict.tags;
  var thingsToRender;

  if (tags) {
    tags = tags.split(',');
    thingsToRender = allThings.filter(hasTags);
  }
  render({thingData: thingsToRender});

  function hasTags(thing) {
    var commonTags = intersection(thing.tags, tags);
    return commonTags.length > 0;
  }  
}

function render({thingData}) {
  var root = d3.select('#things-root');
  var things = root.selectAll('.thing').data(thingData, accessor('name'));
  things.exit().remove();
  var newThings = things.enter().append('li').classed('thing', true);
  
  newThings.append('a').classed('title', true);
  newThings.append('div').classed('description', true);
  newThings.append('img').classed('image', true);
  newThings.append('div').classed('tags', true);

  var updateThings = newThings.merge(things);
  updateThings.selectAll('a')
    .attr('href', accessor('url'))
    .text(accessor('name'));
  updateThings.selectAll('.description').text(accessor('description'));
  updateThings.selectAll('.image').attr('src', accessor('image'));
}
