import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Router, Route, hashHistory } from 'react-router'

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
//		pouch: "http://localhost:5984/mainmypouch/",
		fileNames: {},
		file: "",
		localKBURI: localStorage.getItem("localKB") ? localStorage.getItem("localKB") : "",
		masterKBURI: localStorage.getItem("masterKB") ? localStorage.getItem("masterKB") : "",
		targetFile: "",
		showFileNames: false,
		lastRevision: undefined,
		showServerConfig: false,
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
		  <Router history={hashHistory}>
		    <Route path="/" component={ App }/>
		  </Router>
	</Provider>,
    document.getElementById("example")
);