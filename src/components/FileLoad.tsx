import * as React from "react";
import { MenuOptions } from "../reducers/AppLogic"

const dropdownStyle = {
	position: "relative",
	display: "inline-block"
}

const dropdownContent = {
//    display: "none",
    position: "absolute",
    backgroundColor: "#f9f9f9",
//    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"
}

let linkStyleNoMouse = {
	display: "block",
	color: "black",
	height: "100%",
	paddingLeft: "10px",
	paddingRight: "10px",
	paddingTop: "0px",
    textAlign: "left",
    textDecoration: "none"
};

let linkStyleMouse = {
	display: "block",
	color: "white",
	backgroundColor: "grey",
	height: "100%",
	paddingLeft: "10px",
	paddingRight: "10px",
	paddingTop: "0px",
    textAlign: "left",
    textDecoration: "none"
};

let linkStyleChosen = {
	display: "block",
	color: "white",
	backgroundColor: "grey",
	height: "100%",
	paddingLeft: "10px",
	paddingRight: "10px",
	paddingTop: "0px",
    textAlign: "left",
    textDecoration: "none"
};

export const FileLoad = (props) => {  //onBlur={(e) => props.fileNameFocus(false)} for file input field
	const linkStyle = (item) => {
		let style = linkStyleNoMouse
		switch (props.fileNames[item].menuOption) {
			case MenuOptions.SELECTED: 	{style = linkStyleChosen; break}
			case MenuOptions.NOMOUSE: 	{style = linkStyleNoMouse; break}
			case MenuOptions.HASMOUSE: 	{style = linkStyleMouse; break}
		}
		return style
	}
	let items = Object.keys(props.fileNames)
	return (
		<div>
			File: <input value={ props.file } onFocus={(e) => props.fileNameFocus(true)} onChange={(e) => props.fileNameChange(e)}/>
			{ props.showFileNames ? 
				<div style={ dropdownContent }>
					<ul style={ {listStyleType:"none"} }>
					{ items.map((item, i) => {
						return (
						<li key={ i } style={linkStyle(item)} onMouseEnter= {(e) => props.mouseIn(item)} onMouseLeave= {(e) => props.mouseOut(item)} onClick={(e) => props.clickedItem(item)}>{ item }</li>				
						)
					})
					}
					</ul>
					<button onClick={ (e) => props.hideFileList() }>Cancel</button>
					<button onClick={ (e) => props.loadFileFromPouch() }>Load</button>
				</div> : null}
			|<button onClick={ (e) => props.saveToPouch() }>Save to Pouch Local</button>
			|<button onClick={ (e) => props.deletePouch() }>Delete Pouch Local</button>
			|<input type="file" name={ props.file } onChange={ (e) => props.onSelect(e) }/>|
		</div>
		)
}
