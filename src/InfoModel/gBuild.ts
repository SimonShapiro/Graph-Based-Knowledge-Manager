/*
The idea is to set up a sequence of configurations that read .csv, map their columns to attributes of a known type 
and return errors and a graph which can be merged into other graphs
*/

//Converter Class 
import { Converter } from "csvtojson"
var converter = new Converter({});

converter.fromFile("./file.csv",function(err,result){
 
});

class iNode {
    nodeType:          string;
    id:                           string;
    name:                   string;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}
 
const dummyCsv = [
					 ["ID", "NAME", "PARENT"]
					,["one", "only one", ""]
					,["two", "two too", "one"]
				]

const gBuildConfig = [
				{
					csv: "path 1",
					metaType: "node",   //node or edge
					type: "System",
					map: {
							"id": {name: "ID", type: "string"},
							"name": {name: "NAME", type: "string"}
						}
				},
				{
					csv: "path 1",
					metaType: "edge",   //node or edge
					type: "System_CONSISTSOF_System",
					map: {
							"fromNodeId": {name: "PARENT", type: "string"},
							"toNodeId": {name: "ID", type: "string"},
							"divison": {name: "NAME", type: "string"}
						}
				}
			]

const manufactureItems = (arr, spec) => {
	let header = arr[0]
	let data = arr.slice(1)
	console.log(header, data.length)
	let specKeys = Object.keys(spec.map)
	return data.map((dataRow) => {
		let item =  {
			baseType: spec.metaType,
			itemType: spec.type
		}
		specKeys.forEach((e) => {
			console.log(spec.map[e].name)
			let i = header.indexOf(spec.map[e].name)
			item[e] = ( i > -1) ? dataRow[i] : null
		})
		return item
	})
}

const s = new iNode("s1", "System 1")
s["notes"] = "one two three"

const d = "desc"

s[d] = "fred"

s["age"] = 25
s["size"] = 16

console.log(Object.keys(s).map((e) => {
	return {
		key: e,
		type: typeof(s[e])
	}
}))
console.log(JSON.stringify(s, null, 2))

let items = gBuildConfig.map((e) => manufactureItems(dummyCsv, e))  // for each step
let rawModel = {nodes:{}, edges: {}}
items.forEach((row) => {
	row.forEach((e) => {
		switch (e.baseType) {
			case "node": {
				rawModel.nodes[e.id] = e
				break
			}
			case "edge": {
				let id = `${e.fromNodeId}_${e.itemType}_${e.toNodeId}`
				rawModel.edges[id] = e
			}
		}
	})
})

console.log(items)
console.log(rawModel)