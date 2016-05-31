let a = {}
a["category 1"] = "CAT1"
a["category 2"] = "CAT2"
a
a["category 1"]
a["category c"]
a["category c"] == undefined
a["category 1"] == undefined
let lookup = (item, map) => {
}
let lookup = (item, map, value) => {
delete lookup
let lookup = (item, key, map, newKey) => {
if(map[item[key]] == undefined) item[newKey] = "???"
else item[newKey] = map[item[key]]
let lookup1 = (item, key, map, newKey) => {
if(map[item[key]] == undefined) item[newKey] = "???"
else item[newKey] = map[item[key]]
}
let source = {a:"category 1"}
lookup1(source, "a", a, "class")
let lookup2 = (item, key, map, newKey) => {
if(map[item[key]] == undefined) item[newKey] = "???"
else item[newKey] = map[item[key]]
//
}}
}
}
let lookup2 = (item, key, map, newKey) => {
if(map[item[key]] == undefined) item[newKey] = "???"
else item[newKey] = map[item[key]]
return item
}
lookup2(source, "a", a, "catA")
source
source = {a: "category 1"}
lookup2(source, "a", a, "catA")
lookup2(source, "b", a, "catB")
let sourceArr = [
{a: "category 1"},
{a: "cat c"},
{b: "category 1"}
}
]
]
]
let sourceArr = [
{a: "category 1"},
{a: "cat c"},
{b: "category 1"}
]
sourceArr.map((e) => lookup2(e, "a", a, "newA"))
sourceArr.map((e) => lookup2(e, "a", a, "newA")).
map((e) => lookup2(e, "b", a, "newB"))
save test.js
