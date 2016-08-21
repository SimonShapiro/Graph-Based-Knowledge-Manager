import * as React from "react";

const arrayKeys = (a) => {
	return a.map((e) => {
		switch (typeof(e)) {
			case "object": return e.key
			default: return e
		}
	})
}
/*
const widgetMap1 = (t) => {
	switch (t) {
		case "string": return "textarea"
		default: t
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
*/

const widgetMap = (t):any => {
	switch (t) {
		case "string": return {
			widget: "textarea", 
			widgetSpecifics: {
				rows: 1,
				cols: 80
			}
		}
		default: return {
			widget: t
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
//			console.log("Schema props ",schema.properties[k])
		let cntrl = {
			key: k,
			label: (schemaProps[k].title) ? schemaProps[k].title : k,
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

export const makeUIcontrol = (u, obj, changeFn, dropDowns) => {  // consider making this an object
	switch (u.widget) {
		case "dropDown": {
			let items = Object.keys(dropDowns).filter((e) => {
				return (dropDowns[e].nodeType === u.widgetSpecifics.basedOn)
			}).map((e) => {
				return dropDowns[e]
			})
			let selectedName = (obj[u.key] !== undefined) ? dropDowns[obj[u.key]].name : ""
			return (
				<select onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "-------" }>
					<option key="selected" value={ obj[u.key] }>{ selectedName }</option>
					<option key="root" value="unassigned">-------</option>
					{ items.map((item, i) => {
						return (
								<option key={ i } value={ item.id }>{ item.name }</option>
							)
					})}
				</select>
				)
		}
		case "searchableDropDown": {
			let items = Object.keys(dropDowns).filter((e) => {
				return (dropDowns[e].nodeType === u.widgetSpecifics.basedOn)
			}).map((e) => {
				return dropDowns[e]
			})
			let selectedName = (obj[u.key] !== undefined) ? dropDowns[obj[u.key]].name : ""
			return (
				<select onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "-------" }>
					<option key="selected" value={ obj[u.key] }>{ selectedName }</option>
					<option key="root" value="unassigned">-------</option>
					{ items.map((item, i) => {
						return (
								<option key={ i } value={ item.id }>{ item.name }</option>
							)
					})}
				</select>
				)
		}
		case "select": {
			return (
						<select onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key] !== undefined) ? obj[u.key] : "-------" }>
							<option key="selected">{ obj[u.key]}</option>
							<option key="root">-------</option>
							{ u.widgetSpecifics.options.map((option, i) => {
								return (
									<option key={ i }>{ option }</option>
									)
							}) }
						</select>
					)}
		case "textarea": return (
				<textarea rows={ u.widgetSpecifics.rows } cols={ u.widgetSpecifics.cols } onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "" }></textarea>
			)
		case "url": return (
			<div>
				<textarea rows={ u.widgetSpecifics.rows } cols={ u.widgetSpecifics.cols } onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "" }></textarea>
				<button><a href={ obj[u.key] } target="_blank" style={ {"color": "blue"} }>Go</a></button>
			</div>
			)
		case "integer": return (
					<input type="number" step="1" onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "" }/>
			)
		case "number": return (
					<input type="number" onChange={ (e) => changeFn(u.key, u.type, e) } value={ (obj[u.key]) ? obj[u.key] : "" }/>
			)
		case "date": return (
					<input type="date" onChange={ (e) => changeFn(u.key, u.type, e)} value={ (obj[u.key]) ? obj[u.key] : "" }/>
			)
		default: return (
					<input/>
				)
	}
}
