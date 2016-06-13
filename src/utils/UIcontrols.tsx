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

const formOverSchema = (form, schemaProps, key, index) => {
	console.log("Widget calc: ",form[index], schemaProps[key], key, index)
	let widget = ""
	let widgetSpecifics = {}
	if (typeof(form) === "object") {
		widget = (form[index].widget) ? form[index].widget : widgetMap(schemaProps[key].type).widget
		widgetSpecifics = (form[index].widgetSpecifics) ? form[index].widgetSpecifics : widgetMap(schemaProps[key].type).widgetSpecifics
	}
	else widget = widgetMap(schemaProps[key].type).widget
	return {
		widget: widget,
		widgetSpecifics: widgetSpecifics
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
	let mainKeys = (formKeys[0] === "*") ? schemaKeys : formKeys 
	let UIcontrols = mainKeys.map((k, i) => {
//			console.log(schema.properties[k])
		let cntrl = {
			key: k,
			label: (schemaProps[k].title) ? schema[k].title : k,
			description: schemaProps[k].description,
			type: schemaProps[k].type,
			widget: formOverSchema(form, schemaProps, k, i).widget, //widgetMap(schemaProps[k].type).widget,
			widgetSpecifics: formOverSchema(form, schemaProps, k, i).widgetSpecifics
		}
		return cntrl
	})
	console.log("Only need schema", UIcontrols)
	return UIcontrols
} 

export const makeUIcontrol = (u, obj, changeFn) => {
	switch (u.widget) {
		case "textarea": return (
				<textarea rows={ u.widgetSpecifics.rows } cols={ u.widgetSpecifics.cols } onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "" }></textarea>
			)
		case "integer": return (
					<input type="number" step="1" onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "" }/>
			)
		case "date": return (
					<input type="date" onChange={ (e) => changeFn(u.key, u.type, e)} value={ (obj[u.key]) ? obj[u.key] : "" }/>
			)
		default: return (
					<input/>
				)
	}
}
