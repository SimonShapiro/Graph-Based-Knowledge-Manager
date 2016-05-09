"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var iNode = (function () {
    function iNode(id, name) {
        this.id = id;
        this.name = name;
    }
    return iNode;
}());
var iEdge = (function () {
    function iEdge(fromNodeId, verb, toNodeId) {
        this.id = fromNodeId + "_" + verb + "_" + toNodeId;
        this.fromNodeId = fromNodeId;
        this.toNodeId = toNodeId;
        this.label = verb;
    }
    return iEdge;
}());
var MetaNode = (function (_super) {
    __extends(MetaNode, _super);
    function MetaNode() {
        _super.apply(this, arguments);
        this.nodeType = "MetaNode";
    }
    return MetaNode;
}(iNode));
var MetaEdge = (function (_super) {
    __extends(MetaEdge, _super);
    function MetaEdge() {
        _super.apply(this, arguments);
        this.edgeType = "MetaEdge";
    }
    return MetaEdge;
}(iEdge));
var System_CONNECTS_System = (function (_super) {
    __extends(System_CONNECTS_System, _super);
    function System_CONNECTS_System() {
        _super.apply(this, arguments);
        this.edgeType = "System_CONNECTS_System";
    }
    return System_CONNECTS_System;
}(iEdge));
var System = (function (_super) {
    __extends(System, _super);
    function System() {
        _super.apply(this, arguments);
        this.nodeType = "System";
    }
    return System;
}(iNode));
var Dataset = (function (_super) {
    __extends(Dataset, _super);
    function Dataset() {
        _super.apply(this, arguments);
        this.nodeType = "Dataset";
    }
    return Dataset;
}(iNode));
var iGraph = (function () {
    function iGraph() {
        this.nodes = {};
        this.edges = {};
    }
    iGraph.prototype.addNode = function (n) {
        this.nodes[n.id] = n;
        return this;
    };
    iGraph.prototype.addEdge = function (e) {
        var knownNodes = Object.keys(this.nodes);
        console.log("Known nodes", knownNodes);
        if ((knownNodes.indexOf(e.fromNodeId) != -1) && (knownNodes.indexOf(e.fromNodeId) != -1)) {
            console.log("ok to add edge");
            this.edges[e.id] = e;
        }
        else
            console.log("One or both nodes on this edge missing ", e.fromNodeId, e.toNodeId);
        return this;
    };
    return iGraph;
}());
//  iModel uses the constructor's metaModel to condition the model
var iModel = (function () {
    function iModel(metaModel) {
        this.metaModel = metaModel;
        this.model = new iGraph();
    }
    iModel.prototype.addNode = function (n) {
        //can only add node of types defined in metaModel
        var legalNodes = Object.keys(this.metaModel.nodes);
        if (legalNodes.indexOf(n.nodeType) != -1) {
            this.model.nodes[n.id] = n;
        }
        else
            console.log("NodeType not in metaModel", JSON.stringify(n));
        return this;
    };
    iModel.prototype.addEdge = function (fromNodeId, verb, toNodeId) {
        // can only add if manufactured type is in metamodel and each node is in nodes
        var legalEdges = Object.keys(this.metaModel.edges);
        if ((this.model.nodes[fromNodeId] != undefined) && (this.model.nodes[toNodeId] != undefined)) {
            var edgeType = this.model.nodes[fromNodeId].nodeType + "_" + verb + "_" + this.model.nodes[toNodeId].nodeType;
            if (legalEdges.indexOf(edgeType) != -1) {
                var edgeId = fromNodeId + "_" + verb + "_" + toNodeId;
                var edge = new iEdge(fromNodeId, verb, toNodeId);
                edge.edgeType = edgeType;
                this.model.edges[edgeId] = edge;
            }
            else
                console.log("Attempting illegal edge ", edgeType);
        }
        else
            console.log("Something wrong with constiuents of edge ", fromNodeId, verb, toNodeId);
        return this;
    };
    return iModel;
}());
var subSet = function (a, f) {
    var k = Object.keys(a);
    var sub = k.filter(function (e) {
        return a[e] instanceof f;
    }).map(function (e) { return a[e]; });
    return sub;
};
//====================================  Information Model ===============================
//-------------------- MetaModel ------------------
var m = new iGraph()
    .addNode(new MetaNode("System", "System Meta"))
    .addNode(new MetaNode("Dataset", "Dataset Meta"))
    .addEdge(new MetaEdge("System", "CONNECTS", "System"))
    .addEdge(new MetaEdge("System", "PRODUCES", "Dataset"))
    .addEdge(new MetaEdge("System", "USES", "Dataset"));
//-------------------- Model ---------------------
var a = new iModel(m)
    .addNode(new System("S1", "System1"))
    .addNode(new System("S2", "System2"))
    .addNode(new Dataset("D1", "Data1"))
    .addEdge("S1", "CONNECTS", "S2")
    .addEdge("D1", "CONNECTS", "S1");
a.model.nodes["S1"].description = "System One";
console.log(JSON.stringify(a, null, 2));
console.log(subSet(a.model.nodes, iNode)); // iNode to return everything
console.log(a.model.nodes["S1"].nodeType);
exports.InfoModel = m;
