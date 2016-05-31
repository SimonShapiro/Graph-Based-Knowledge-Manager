import * as React from "react";
//import * as Griddle from "griddle-react"

declare var require: any

const Griddle = require('griddle-react');

let nodeMenuStyle = {
	color: "blue",
	cursor: "pointer"
}

export const NodeList = (props) => {

	const editLink = (item) => {
		console.log("Have props ", item)
		return (
			<div style={nodeMenuStyle}>
				<a onClick={(e) => props.clickedAction("View", item.rowData)}>view </a>
				| <a onClick={(e) => props.clickedAction("Edit", item.rowData)}>edit </a>
				| <a onClick={(e) => props.clickedAction("Delete", item.rowData)}>delete </a>
			</div>	
		)
	}

	return (
	<div id="NodeList">
		<h2>{props.heading}...</h2>
		<h3>possible outlinks:</h3>
		<Griddle results={props.metaFrom} columns={["fromNodeId", "label", "toNodeId"]}/>
		<h3>possible inlinks:</h3>
		<Griddle results={props.metaTo} columns={["fromNodeId", "label", "toNodeId"]}/>
		<h3>Items:</h3>
		<Griddle results={items} columnMetadata={nodeColumnProps} columns={["actions", "id", "name"]}/>
		<h3>Crumbs</h3>
	</div>
	)
}