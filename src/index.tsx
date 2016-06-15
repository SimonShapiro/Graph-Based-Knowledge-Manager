import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//import { MainContainer } from "./reducers/MainContainer";
import { App } from "./components/App";
import { AppLogic } from "./reducers/AppLogic"
import { MenuOptions } from "./reducers/AppLogic"

import { mergeSchemaAndForm } from "./utils/UIcontrols"

//import { InfoModel } from "./infomodel/InfoModel"

//console.log(InfoModel)

//let model = JSON.parse(JSON.stringify(InfoModel))  //This leaves model as pure data making it easier to clone

let model = undefined

/* Just testing form and schema merge to be incorporated elsewhere later

let schema = 	{
					"title": "Person",
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"description": "A unique id for the person"
						},
						"name": {
							"type": "string"
						},
						"dateOfBirth": {
							"type": "string"
						},
						"notes": {
							"type": "string"
						}
					}
				}

let form1 = ["*"]


mergeSchemaAndForm(schema, form1)

 schema and form merge ends
*/

const prepareInitialUIState = () => {
	return {
		pouch: "MyPouch",
		fileNames: {},
		file: "",
		targetFile: "",
		showFileNames: false,
		lastRevision: undefined,
		menu: {},
		focusNodeType: "",
		editControlForNodeList: true,
		focusNode: "",
		nodeInPanel: {},
		edgeInPanel: {},
		edgePanelVisible: false,
		focusEdgeType: "",
		panelDropDowns: {},
		nodeFormVisible: false,
		nodePanelVisible: false,
		nodeDetailId: undefined,
		nodeCrumbTrail: []
	}
}
// , {data: model, UIstate: prepareInitialUIState(model)}
let store = createStore(AppLogic, {data: model, UIstate: prepareInitialUIState()}, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
    document.getElementById("example")
);