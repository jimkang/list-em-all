var d3 = require('d3-selection');
var accessor = require('accessor');

var getName = accessor('name');
var getURL = accessor('url');
var getImage = accessor('image');
var getDescription = accessor('description');
function identity(x) { return x; }

function render({thingList, rootId, thingClass, onTagClick}) {
  var root = d3.select('#' + rootId);
  var things = root.selectAll('.' + thingClass).data(thingList, getName);
  things.exit().remove();
  var newThings = things.enter().append('li').classed(thingClass, true);
  
  newThings.append('div').classed('title', true);
  newThings.append('div').classed('description', true);
  newThings.append('img').classed('image', true);
  newThings.append('ul').classed('link-root', true);    
  newThings.append('ul').classed('tag-root', true);

  var updateThings = newThings.merge(things);
  updateThings.selectAll('.title').text(getName);
  updateThings.selectAll('.description').html(getDescription);
  updateThings.selectAll('.image').attr('src', getImage);

  var links = updateThings.select('.link-root').selectAll('li').data(getURLs, identity);
  links.exit().remove();
  var newLinks = links.enter().append('li').append('a');
  newLinks.merge(links)
    .text(getName)
    .attr('href', getURL);

  var tags = updateThings.select('.tag-root').selectAll('li').data(getTags, identity);
  tags.exit().remove();
  var newTags = tags.enter().append('li');
  newTags.append('a');

  if (onTagClick) {
    newTags.on('click', onTagClick);
  }

  newTags.merge(tags).selectAll('a').text(identity);
}

function getURLs(thing) {
  if (thing.urls) {
    return thing.urls;
  }
  else {
    return [];
  }
}

function getTags(thing) {
  if (thing.tags) {
    return thing.tags;
  }
  else {
    return [];
  }
}

module.exports = render;
