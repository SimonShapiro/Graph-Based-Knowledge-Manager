"use strict";
var React = require("react");
var Griddle = require('griddle-react');
var editLink = function (props) {
    return (<div>
			<a onClick={function (e) { return props.clickedAction("View"); }}>view</a>|
			<a onClick={function (e) { return props.clickedAction("Edit"); }}>edit</a>|
			<a onClick={function (e) { return props.clickedAction("Delete"); }}>delete</a>
		</div>);
};
exports.NodeList = function (props) {
    console.log("Setting edit controls ", props.editControl);
    var items = props.items.map(function (e) {
        if (props.editControl) {
            e["actions"] = true;
        }
        return e;
    });
    var columnProps = [
        {
            columnName: "actions",
            order: 1,
            customComponent: editLink
        }
    ];
    return (<div id="NodeList">
		<h2>{props.heading}</h2>
		<Griddle results={items} columnMetadata={columnProps}/>
		<h3>Related (from)</h3>
		<Griddle results={props.metaFrom}/>
		<h3>Related (to)</h3>
		<Griddle results={props.metaTo}/>
	</div>);
};
