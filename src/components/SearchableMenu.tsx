import * as React from "react";

export const SearchableMenu = (props) => {
	return (
		<div>
			<input type="text" onChange={ (e) => {props.changeSearchFilter(e)} } placeholder="Search" value={ props.displayText }></input>
		</div>
		)
}