import * as React from "react";

const dropdownStyle = {
	position: "relative",
	display: "inline-block"
}

const dropdownContent = {
//    display: "none",
    position: "absolute",
    backgroundColor: "#f9f9f9",
    minWidth: "160px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"
}

export const FileLoad = (props) => {
	let file = "File"
	return (
		<div>
			File: <input value={ props.file } onFocus={(e) => props.fileNameFocus(true)} onBlur={(e) => props.fileNameFocus(false)}onChange={(e) => props.fileNameChange(e)}/>
			{ props.showFileNames ? 
				<div style={ dropdownContent }>
					<ul style={ {listStyleType:"none"} }>
					{ props.fileNames.map((item, i) => {
						return (
						<li key={ i } onMouseEnter= {(e) => props.mouseIn(item)} onMouseLeave= {(e) => props.mouseOut(item)} onClick={(e) => props.clickedItem(item)}>{ item }</li>				
						)
					})
					}
					</ul>
				</div> : null}
			|<button onClick={ (e) => props.saveToPouch() }>Save to Pouch Local</button>
			|<button onClick={ (e) => props.deletePouch() }>Delete Pouch Local</button>
			|<input type="file" name={ props.file } onChange={ (e) => props.onSelect(e) }/>|
		</div>
		)
}