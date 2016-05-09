import * as React from "react";

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


//onMouseEnter= {(e) => props.mouse()} 

export const MenuStrip = (props) => {
	console.log("Conditional formatting with ", props.mouseTarget)
	return (
	<div id="MenuStrip">
		<ul style={listStyle}>
		{props.items.map((item, i) => (
			<li key={i} style={itemStyle} onMouseEnter= {(e) => props.mouseIn(item)} onMouseLeave= {(e) => props.mouseOut(item)} onClick={(e) => props.clickedItem(item)}>
				<span id={"Item_"+i} style={props.mouseTarget[i] ? linkStyleMouse : linkStyleNoMouse}>{item}</span>
			</li>
			)
		)}
		</ul>
	</div>
	)}