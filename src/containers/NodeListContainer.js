"use strict";
var react_redux_1 = require("react-redux");
var NodeList_1 = require("/users/simonshapiro/reactexp/src/components/NodeList");
var nodesAsArrayOfType = function (state, nodeType) {
    console.log("Going for nodes of type ", nodeType);
    var a = state.data.model.nodes;
    var k = Object.keys(a);
    var sub = k.filter(function (e) {
        return a[e].nodeType == nodeType;
    }).map(function (e) { return a[e]; });
    console.log("Got nodes ", sub);
    return sub;
};
var relatedMetaFromThis = function (state, nodeType) {
    var nodes = state.data.metaModel.nodes;
    var edges = state.data.metaModel.edges;
    var edgeIterator = Object.keys((edges));
    var sub = edgeIterator.filter(function (e) {
        return edges[e].fromNodeId == nodeType;
    }).map(function (e) { return edges[e]; });
    console.log("Got meta out ", sub);
    return sub;
};
var relatedMetaToThis = function (state, nodeType) {
    var nodes = state.data.metaModel.nodes;
    var edges = state.data.metaModel.edges;
    var edgeIterator = Object.keys((edges));
    var sub = edgeIterator.filter(function (e) {
        return edges[e].toNodeId == nodeType;
    }).map(function (e) { return edges[e]; });
    console.log("Got meta in ", sub);
    return sub;
};
/*
const clickedAction = (e) => {
    console.log(e)
    alert("Clicked ", e)
}
*/
var mapStateToProps = function (state) {
    var list = nodesAsArrayOfType(state, state.UIstate.focusNodeType).map(function (e) { return e; });
    console.log("Returning ", list, list.length);
    return {
        heading: state.UIstate.focusNodeType,
        items: list,
        editControl: state.UIstate.editControlForNodeList,
        metaFrom: relatedMetaFromThis(state, state.UIstate.focusNodeType),
        metaTo: relatedMetaToThis(state, state.UIstate.focusNodeType)
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        //		newTextValue: (e) => {dispatch({type: "ON_CHANGE", text: e.target.value})},
        clickedAction: function (action) {
            console.log(action);
            dispatch({ type: "DummyAction", text: "dummy" });
        }
    };
};
exports.NodeListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NodeList_1.NodeList);
