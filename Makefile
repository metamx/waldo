compile-parser: server/parser.pegjs
	pegjs server/parser.pegjs
start: ; node server/app
