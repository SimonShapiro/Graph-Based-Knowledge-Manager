import * as React from "react";

import { mergeSchemaAndForm, makeUIcontrol } from "../utils/UIcontrols"

// returns null or a crud panel for a nodetype with a schema

const changeFn = (key, e) => {
	console.log("Local change on "+key+":"+e.target.value)
}

export const NodePanel = (props) => {
	if(props.panelVisible) {
		let propKeys = Object.keys(props.schema.properties)
		let UIdesign = mergeSchemaAndForm(props.schema, props.form)
		console.log(UIdesign)
		return (
			<div style={ {backgroundColor: "pink"} }>
				<p>{ props.nodeType }</p>
				<p>{ JSON.stringify(props.schema, null, 2) }</p>
				<p>{ JSON.stringify(props.form, null, 2) }</p>
				<table>
				<thead/>
				<tbody>
				{ UIdesign.map((e, i) => {
					console.log(JSON.stringify(e), null, 2)
					return (
							<tr key={ i }>
								<td>{ e.label }</td><td>{ makeUIcontrol(e, props.node, props.changeFn) }</td>
							</tr>
						)})}
				</tbody>
				</table>
				<button onClick={ (e) => props.saveNodePanel() }>Save</button>
				<button onClick={ (e) => props.cancelNodePanel() }>Cancel</button>
			</div>)
		}
	else return null	
}