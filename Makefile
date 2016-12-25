BROWSERIFY = ./node_modules/.bin/browserify
UGLIFY = ./node_modules/.bin/uglifyjs
TRANSFORM_SWITCH = -t [ babelify --presets [ es2015 ] ]

run:
	wzrd app.js:example.js -- \
		-d \
		$(TRANSFORM_SWITCH)

build-example:
	$(BROWSERIFY) $(TRANSFORM_SWITCH) app.js | $(UGLIFY) -c -m -o example.js

test:
	node tests/basictests.js

pushall:
	git push origin gh-pages && npm publish

lint:
	eslint .
