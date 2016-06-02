import * as React from "react";
import { MenuOptions } from "../reducers/AppLogic"

let listStyle = {
   	listStyleType: "none",
	overflow: "hidden",
    margin: 0,
    padding: 0,
    height: "60px",
    width: "100%",
    backgroundColor: "#333"
}

let itemStyle = {
	float: "left", 
	height: "100%"
}

let linkStyleNoMouse = {
	display: "block",
	color: "white",
	height: "100%",
	paddingLeft: "10px",
	paddingRight: "10px",
	paddingTop: "20px",
    textAlign: "center",
    textDecoration: "none"
};

let linkStyleMouse = {
	display: "block",
	color: "white",
	backgroundColor: "grey",
	height: "100%",
	paddingLeft: "10px",
	paddingRight: "10px",
	paddingTop: "20px",
    textAlign: "center",
    textDecoration: "none"
};

let linkStyleChosen = {
	display: "block",
	color: "white",
	backgroundColor: "lightgrey",
	height: "100%",
	paddingLeft: "10px",
	paddingRight: "10px",
	paddingTop: "20px",
    textAlign: "center",
    textDecoration: "none"
};

export const MenuStrip = (props) => {

	const linkStyle = (item) => {
		let style = linkStyleNoMouse
		switch (props.menu[item].menuOption) {
			case MenuOptions.SELECTED: 	{style = linkStyleChosen; break}
			case MenuOptions.NOMOUSE: 	{style = linkStyleNoMouse; break}
			case MenuOptions.HASMOUSE: 	{style = linkStyleMouse; break}
		}
		return style
	}
	return (
	<div id="MenuStrip">
		<ul style={listStyle}>
		{props.items.map((item, i) => (
			<li key={i} style={itemStyle} onMouseEnter= {(e) => props.mouseIn(item)} onMouseLeave= {(e) => props.mouseOut(item)} onClick={(e) => props.clickedItem(item)}>
				<span id={"Item_"+i} style={ linkStyle(item) }>{item}</span>
			</li>
			)
		)}
		</ul>
	</div>
	)}