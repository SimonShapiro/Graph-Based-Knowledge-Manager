import * as React from "react";

export const FileLoad = (props) => {
	let file = "File"
	return (
		<div>
			|<input type="file" name={ file } onChange={ (e) => props.onSelect(e) }/>|
			<button onClick={ props.saveToPouch() }>Save to Pouch Local</button>
		</div>
		)
}