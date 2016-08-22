import * as React from "react";

export const SearchableMenu = (props) => {
	return (
		<div>
			<input type="text" onChange={ (e) => {props.changeSearchFilter(e)} } placeholder="Search" value={ props.displayText }></input>
			<button onClick={ (e) => {props.clearSearchFilter(e)} }>x</button>
		</div>
		)
}