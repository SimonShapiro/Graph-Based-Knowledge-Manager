import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { Router, Route, browserHistory, Redirect } from 'react-router'

//import { MainContainer } from "./reducers/MainContainer";
import { App } from "./components/App";
import { FileLoadContainer } from "./containers/FileLoadContainer"
import { exportModelContainer } from "./exportModel/exportModelContainer"

import { AppLogic } from "./reducers/AppLogic"
import { MenuOptions } from "./reducers/AppLogic"

import { menuTest } from "./menuTest/menuTest" 

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
		nodeCrumbTrail: [],
		downloadableFile: null,
		exportMode: "Complete",
		completeModelBrowserMenu: {},
		nodeSearchFilter: ""
	}
}
// , {data: model, UIstate: prepareInitialUIState(model)}
let store = createStore(AppLogic, {data: model, UIstate: prepareInitialUIState()}, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		  <Router history={browserHistory}>
		  	<Redirect from="/index_cdn.html" to="/" />
		  	<Redirect from="/index.html" to="/" />
		    <Route path="/" component={ App }/>
		    <Route path="/files" component= { FileLoadContainer }/>
		    <Route path="/menuTest" component={ menuTest }/>
		    <Route path="/exportModel" component={ exportModelContainer }/>
		  </Router>
	</Provider>,
    document.getElementById("example")
);