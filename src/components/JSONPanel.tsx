import * as React from "react";

import { mergeSchemaAndForm, makeUIcontrol } from "../utils/UIcontrols"

// returns null or a crud panel for a nodetype with a schema

const changeFn = (key, e) => {
	console.log("Local change on "+key+":"+e.target.value)
}

export const JSONPanel = (props) => {
	if(props.panelVisible) {
//		let propKeys = Object.keys(props.schema.properties)
		let UIdesign = mergeSchemaAndForm(props.schema, props.form)
//		console.log(UIdesign)
		return (
			<div style={ {backgroundColor: "pink"} }>
				<button onClick={ (e) => props.hidePanel() }>Hide</button><b>{ props.objType }</b>
				<table>
				<thead/>
				<tbody>
				{ UIdesign.map((e, i) => {
					console.log(JSON.stringify(e), null, 2)
					return (
							<tr key={ i }>
								<td>{ e.label }</td><td>{ makeUIcontrol(e, props.obj, props.changeFn, props.dropDowns, props.dropDownMngr) }</td>
							</tr>
						)})}
				</tbody>
				</table>
				<button onClick={ (e) => props.savePanel() }>Save</button>
				<button onClick={ (e) => props.cancelPanel() }>Cancel</button>
			</div>)
		}
	else return null	
}