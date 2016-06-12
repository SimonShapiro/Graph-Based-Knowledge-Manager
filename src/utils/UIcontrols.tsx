import * as React from "react";

const arrayKeys = (a) => {
	return a.map((e) => {
		switch (typeof(e)) {
			case "object": return e.key
			default: return e
		}
	})
}

const widgetMap1 = (t) => {
	switch (t) {
		case "string": return "textarea"
		case "integer": return "integer"
		default: "input"
	}
}
const widgetStandardDefaults = (w):any => {
	switch (w) {
		case "textarea": return {
			rows: 1,
			cols: 160
		}
		default: return {}
	}
}

const widgetMap = (t):any => {
	switch (t) {
		case "string": return {
			widget: "textarea", 
			widgetSpecifics: {
				rows: 1,
				cols: 80
			}
		}
		case "integer": return {
			widget: "integer",
			widgetSpecifics: {}
		}
	}
}

export const mergeSchemaAndForm = (schema, form) => {
/*
{
	UIControl: {
		label: "",
		description: "",
		type: "",
		widget: ""
		widgetSpecifics: {},
		mandatory: false,
		key: ""
	}
}
*/

	let schemaKeys = Object.keys(schema.properties)
	let formKeys = arrayKeys(form)
	let schemaProps = schema.properties
	if (formKeys[0] === "*") {
		let UIcontrols = schemaKeys.map((k, i) => {
//			console.log(schema.properties[k])
			let cntrl = {
				key: k,
				label: (schemaProps[k].title) ? schema[k].title : k,
				description: schemaProps[k].description,
				type: schemaProps[k].type,
				widget: widgetMap(schemaProps[k].type).widget,
				widgetSpecifics: widgetMap(schemaProps[k].type).widgetSpecifics
			}
			return cntrl
		})
		console.log("Only need schema", UIcontrols)
		return UIcontrols
	}
	else {
		console.log("Need Processing")	
	//	Object.assign({},{})
		return []
	}
} 

export const makeUIcontrol = (u, changeFn) => {
	switch (u.widget) {
		case "textarea": return (
				<textarea rows={ u.widgetSpecifics.rows } cols={ u.widgetSpecifics.cols } onChange={ (e) => changeFn(u.key, u.type, e) }></textarea>
			)
		case "integer": return (
					<input type="number" step="1" onChange={ (e) => changeFn(u.key, u.type, e) }/>
			)
		default: return (
					<input/>
				)
	}
}
