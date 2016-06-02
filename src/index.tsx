import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

//import { MainContainer } from "./reducers/MainContainer";
import { App } from "./components/App";
import { AppLogic } from "./reducers/AppLogic"
import { MenuOptions } from "./reducers/AppLogic"
import { InfoModel } from "./infomodel/InfoModel"

console.log(InfoModel)

let model = JSON.parse(JSON.stringify(InfoModel))  //This leaves model as pure data making it easier to clone

const prepareInitialUIState = (model) => {
	let menu = {}	
	Object.keys(model.metaModel.nodes).forEach((e) => {
		menu[e] = {
			label: e,
			menuOption: MenuOptions.NOMOUSE
		}
	})	
	console.log("Menu state ", menu);
	return {
		menu: menu,
		focusNodeType: "",
		editControlForNodeList: true,
		focusNode: "",
		nodeFormVisible: false,
		nodeDetailId: undefined,
		nodeCrumbTrail: []
	}
}

let store = createStore(AppLogic, {data: model, UIstate: prepareInitialUIState(model)});

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
    document.getElementById("example")
);