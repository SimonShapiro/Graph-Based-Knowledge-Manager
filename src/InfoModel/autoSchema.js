"use strict"
let test = {
	one: 1,
	two: "two",
	"three": ["one", {"two": 2}, "three"],
	"bool": true,
	"NULL": null,
	"UNDF": undefined
}


const objectToSchema = (obj) => {
	let keys = Object.keys(test)
	let schema = {
		properties: keys.map((k) => {
			return {
				key: k,
				type: Array.isArray(obj[k]) ? 'Array' : typeof(obj[k])
			}
		})}
	return schema
}

console.log(objectToSchema(test))