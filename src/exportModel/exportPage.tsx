import * as React from "react";
import { Link } from 'react-router'

export const exportPage = (props) => {
	return (
		<div>
			<Link to={ props.generateFile(JSON.stringify(props.model, null, 2)) } target="_blank" onClick={(event) => {event.preventDefault(); window.open(props.generateFile(JSON.stringify(props.model, null, 2)));}}><button>DownLoad</button></Link><br/>
			<textarea cols="120" rows="80" readOnly="true" value={ JSON.stringify(props.model, null, 2) }></textarea>
		</div>
		)
}
