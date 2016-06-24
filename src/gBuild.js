/*
The idea is to set up a sequence of configurations that read .csv, map their columns to attributes of a known type
and return errors and a graph which can be merged into other graphs
*/
"use strict";
//Converter Class 
var csvtojson_1 = require("csvtojson");
var converter = new csvtojson_1.Converter({});
converter.fromFile("./file.csv", function (err, result) {
});
var iNode = (function () {
    function iNode(id, name) {
        this.id = id;
        this.name = name;
    }
    return iNode;
}());
var dummyCsv = [
    ["ID", "NAME", "PARENT"],
    ["one", "only one", ""],
    ["two", "two too", "one"]
];
var gBuildConfig = [
    {
        csv: "path 1",
        metaType: "node",
        type: "System",
        map: {
            "id": { name: "ID", type: "string" },
            "name": { name: "NAME", type: "string" }
        }
    },
    {
        csv: "path 1",
        metaType: "edge",
        type: "System_CONSISTSOF_System",
        map: {
            "fromNodeId": { name: "PARENT", type: "string" },
            "toNodeId": { name: "ID", type: "string" },
            "divison": { name: "NAME", type: "string" }
        }
    }
];
var manufactureItems = function (arr, spec) {
    var header = arr[0];
    var data = arr.slice(1);
    console.log(header, data.length);
    var specKeys = Object.keys(spec.map);
    return data.map(function (dataRow) {
        var item = {
            baseType: spec.metaType,
            itemType: spec.type
        };
        specKeys.forEach(function (e) {
            console.log(spec.map[e].name);
            var i = header.indexOf(spec.map[e].name);
            item[e] = (i > -1) ? dataRow[i] : null;
        });
        return item;
    });
};
var s = new iNode("s1", "System 1");
s["notes"] = "one two three";
var d = "desc";
s[d] = "fred";
s["age"] = 25;
s["size"] = 16;
console.log(Object.keys(s).map(function (e) {
    return {
        key: e,
        type: typeof (s[e])
    };
}));
console.log(JSON.stringify(s, null, 2));
var items = gBuildConfig.map(function (e) { return manufactureItems(dummyCsv, e); }); // for each step
var rawModel = { nodes: {}, edges: {} };
items.forEach(function (row) {
    row.forEach(function (e) {
        switch (e.baseType) {
            case "node": {
                rawModel.nodes[e.id] = e;
                break;
            }
            case "edge": {
                var id = e.fromNodeId + "_" + e.itemType + "_" + e.toNodeId;
                rawModel.edges[id] = e;
            }
        }
    });
});
console.log(items);
console.log(rawModel);
