/*
The generic list control should:

Parameters:
- a json map: ie somthing that responds to ojb[key] with a known structure
- a shema describing the expected structure
- a selection of keys to present in a list(table) format

eg.

map = {
	"one": {
		"id": "one",
		"name": "One",
		"age": 10,
		"notes": "Ipso facto"
	},
	"two": {
		"id": "two",
		"name": "Two",
		"age": 20,
		"notes": "Lorem Ipsum"
	}
}

selection = ["id", "name", "age"]

Functionality:
	a. display a table with the colunms in selection in order
	b. select a row from the table and return the the whole obj[selected]
	c. filter the rows based in a query string
		eg "(('id' == 'two') || ('age' < 12))"
*/