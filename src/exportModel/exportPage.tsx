import * as React from "react";
import { Link } from 'react-router'

export const exportPage = (props) => {
	return (
		<div>
			<input type="radio" name="export" checked={ (props.exportMode === "Complete") } onChange={ (e) => props.changeExportMode(e) } value="Complete"/> Complete Loadable Model 
			<input type="radio" name="export" checked={ (props.exportMode === "Data") } onChange={ (e) => props.changeExportMode(e) } value="Data"/> Data Only 
			<input type="radio" name="export" checked={ (props.exportMode === "Metamodel") } onChange={ (e) => props.changeExportMode(e) } value="Metamodel"/> Loadable Metamodel 
			<Link to={ props.generateFile(JSON.stringify(props.model, null, 2)) } target="_blank" onClick={(event) => {event.preventDefault(); window.open(props.generateFile(JSON.stringify(props.model, null, 2)));}}><button>DownLoad</button></Link><br/>
			<textarea cols="120" rows="80" readOnly="true" value={ JSON.stringify(props.model, null, 2) }></textarea>
		</div>
		)
}
