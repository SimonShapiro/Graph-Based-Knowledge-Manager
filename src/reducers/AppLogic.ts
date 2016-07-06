declare function require(a)

const sha1 = require("js-sha1")

const makeSchema = (obj) => {
	let k = Object.keys(obj)
	let schemaProps = {}
	k.forEach((e) => {
		schemaProps[e] = {
			title: e,
			type: Array.isArray(obj[e]) ? 'Array' : typeof(obj[e])
		}
	})
	return {
		   "type": "object",
		    "properties": schemaProps

	}
}

const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const shaShort = (str) => {
	return sha1(str).slice(0, 5)
}

export enum MenuOptions {
	SELECTED,
	HASMOUSE,
	NOMOUSE
}

export const AppLogic = (state, action) => {

	console.log("Recieved action ", action);
	let newState = JSON.parse(JSON.stringify(state))   //state is a pure json object
//	let newState = Object.assign({}, state)  //some typescript -> es6 issues prevetn this from working ???
	switch (action.type) {
		case "ON_CHANGE": {
//			console.log("Change action");

			return {
				text: action.text
			}
		}
		case "MenuMouseIn": {
			if(newState.UIstate.menu[action.selected].menuOption !== MenuOptions.SELECTED) newState.UIstate.menu[action.selected].menuOption = MenuOptions.HASMOUSE
			console.log("New state ", newState)
			return newState
		}
		case "MenuMouseOut": {
			if(state.UIstate.menu[action.selected].menuOption !== MenuOptions.SELECTED) newState.UIstate.menu[action.selected].menuOption = MenuOptions.NOMOUSE
			console.log("New state ", newState)
			return newState
		}
		case "MenuStripOnClick": {
			let previousSelected = newState.UIstate.focusNodeType
			console.log("MenuStripOnClick", previousSelected, action.selected, state)
			newState.UIstate.focusNodeType = action.selected
			newState.UIstate.nodeInPanel = {nodeType: action.selected}
			if (previousSelected !== ""){
				newState.UIstate.menu[previousSelected].menuOption = MenuOptions.NOMOUSE
			}
			newState.UIstate.menu[action.selected].menuOption = MenuOptions.SELECTED
			newState.UIstate.nodeDetailId = ""
			newState.UIstate.nodePanelVisible = true
			newState.UIstate.edgePanelVisible = false
			console.log("New state ", newState)
			return newState  // probably need a full copy of state
		}
		case "FileMenuMouseIn": {
			if(newState.UIstate.fileNames[action.selected].menuOption !== MenuOptions.SELECTED) newState.UIstate.fileNames[action.selected].menuOption = MenuOptions.HASMOUSE
			console.log("New state ", newState)
			return newState
		}
		case "FileMenuMouseOut": {
			if(state.UIstate.fileNames[action.selected].menuOption !== MenuOptions.SELECTED) newState.UIstate.fileNames[action.selected].menuOption = MenuOptions.NOMOUSE
			console.log("New state ", newState)
			return newState
		}
		case "FileMenuOnClick": {
			let previousSelected = newState.UIstate.targetFile
			console.log("FileMenuOnClick", previousSelected, action.selected, state)
			newState.UIstate.targetFile = action.selected
			newState.UIstate.file = action.selected
			if (previousSelected !== ""){
				newState.UIstate.fileNames[previousSelected].menuOption = MenuOptions.NOMOUSE
			}
			newState.UIstate.fileNames[action.selected].menuOption = MenuOptions.SELECTED
			console.log("New state (FileMenuOnClick)", newState)
			return newState  // probably need a full copy of state
		}
		case "NodeListAction" : {
			console.log("Nodelistaction ", action.data.action, action.data.id)
			newState.UIstate.nodePanelVisible = true
			newState.UIstate.nodeDetailId = action.data.id
			newState.UIstate.nodeInPanel = JSON.parse(JSON.stringify(newState.data.model.nodes[action.data.id]))  //needs a clean copy based on current metamodel
			newState.UIstate.nodeCrumbTrail.push(action.data.id)  // might need a structure that includes nodeType
			console.log("New state ", newState)
			return newState
		}
		case "ResetTrail": {
			newState.UIstate.nodeCrumbTrail = state.UIstate.nodeCrumbTrail.slice(-1)
			newState.UIstate.edgePanelVisible = false
			console.log("New state ", newState)
			return newState
		}
		case "TrimTrail": {
			let previousSelected = newState.UIstate.focusNodeType
			let id = state.UIstate.nodeCrumbTrail[action.trimTo]
			let nodeType = state.data.model.nodes[id].nodeType
			console.log("Restoring after trim ", id, nodeType)
			newState.UIstate.nodeDetailId = id
			newState.UIstate.nodePanelVisible = true
			newState.UIstate.nodeInPanel = JSON.parse(JSON.stringify(state.data.model.nodes[id]))
			newState.UIstate.focusNodeType = nodeType
			newState.UIstate.nodeCrumbTrail = state.UIstate.nodeCrumbTrail.slice(0, action.trimTo + 1)
			if (previousSelected !== ""){
				newState.UIstate.menu[previousSelected].menuOption = MenuOptions.NOMOUSE
			}
			newState.UIstate.menu[nodeType].menuOption = MenuOptions.SELECTED
			newState.UIstate.edgePanelVisible = false
			console.log("New state ", newState)
			return newState
		}
		case "RefreshDocList": {
			newState.UIstate.fileNames = action.docs
			console.log("New state (RefreshDocList)", newState)
			return newState
		}
		case "LoadFile": {
			newState.UIstate.file = action.fileName
			newState.UIstate.lastRevision = undefined
			newState.data = action.file
			let menu = {}
			Object.keys(newState.data.metaModel.nodes).forEach((e) => {
				menu[e] = {
				label: e,
				menuOption: MenuOptions.NOMOUSE
			}})
			newState.UIstate.menu = menu
			console.log("New state (LoadFile)", newState)
			return newState
		}
		case "SaveToPouch": {
			newState.UIstate.lastRevision = action.data.rev
			newState.UIstate.showFileNames = false
			console.log("New state (SaveToPouch)", newState)
			return newState
		}
		case "DeletePouchLocalDone": {
			newState.UIstate.lastRevision = undefined
			console.log("New state (DeletePouchLocalDone)", newState)
			return newState
		}
		case "KBChange": {
			switch (action.mode){
				case "local": {
					newState.UIstate.localKBURI = action.uri
					localStorage.setItem("localKB", action.uri)
					break
				}
				case "master": {
					newState.UIstate.masterKBURI = action.uri
					localStorage.setItem("masterKB", action.uri)
					break
				}
				default: {

				}
			console.log("New state (KBChange)", newState)
			return newState
			}
		}
		case "FileNameChange": {
			newState.UIstate.file = action.data
			newState.UIstate.lastRevision = undefined
			console.log("New state (FileNameChange)", newState)
			return newState
		}
		case "ShowFileList": {
			newState.UIstate.showFileNames = true
			newState.UIstate.fileNames = action.docs
			console.log("New state (ShowFileList)", newState)
			return newState
		}
		case "HideFileList": {
			newState.UIstate.showFileNames = false
			console.log("New state (HideFileList)", newState)
			return newState
		}
		case "GotFileDataFromPouch": {
			newState.UIstate.showFileNames = false
			newState.UIstate.file = action.result._id
			newState.UIstate.lastRevision = action.result._rev
			newState.data = action.result.model
			let menu = {}
			Object.keys(newState.data.metaModel.nodes).forEach((e) => {
				menu[e] = {
				label: e,
				menuOption: MenuOptions.NOMOUSE
			}})
			newState.UIstate.menu = menu
			newState.UIstate.focusNodeType = ""
			newState.UIstate.nodeCrumbTrail = []
			newState.UIstate.nodePanelVisible = false
			console.log("New state (GotFileDataFromPouch)", newState)
			return newState
		}
		case "NewNodeOfType": {  //todo sensible defaults
			newState.UIstate.nodePanelVisible = true
			newState.UIstate.nodeInPanel = {nodeType: action.nodeType}
			newState.UIstate.focusNode = ""  // not sure if this is needed
			newState.UIstate.nodeDetailId = ""
			console.log("New state (NewNodeOfType)", newState)
			return newState
		}
		case "NewEdgeOfType": {  //todo sensible defaults
			newState.UIstate.edgePanelVisible = true
			newState.UIstate.focusEdgeType = action.edgeType
			newState.UIstate.edgeInPanel = {
											edgeType: action.edgeType, 
											id: generateUUID(),  // this allows for many edges between the same two nodes of the same type.... Is this desirable?
											label: state.data.metaModel.edges[action.edgeType].label
											}  
			console.log("New state (NewEdgeOfType)", newState)
			return newState
		}
		case "CancelNodePanel": {
			newState.UIstate.nodePanelVisible = false
			console.log("New state (CancelNodePanel)", newState)
			return newState
		}
		case "SaveNodePanel": {
			newState.data.model.nodes[newState.UIstate.nodeInPanel.id] = newState.UIstate.nodeInPanel
			console.log("New state (SaveNodePanel)", newState)
			return newState
		}	
		case "DeleteNodePanel": {
			let target = newState.UIstate.nodeInPanel.id
			let edgeList = Object.keys(newState.data.model.edges)
			edgeList.filter( (edge) => {
				let comp = newState.data.model.edges[edge]
				return ((comp.toNodeId === target) || (comp.fromNodeId === target))
			}).forEach( (e) => {
//				console.log("Trying to delete ", e)
				delete newState.data.model.edges[e]
			})
			delete newState.data.model.nodes[newState.UIstate.nodeInPanel.id]
			newState.UIstate.nodeCrumbTrail = newState.UIstate.nodeCrumbTrail.filter( (e) => {
				return (e !== target)
			})
			newState.UIstate.nodePanelVisible = false
			console.log("New state (DeleteNodePanel)", newState)
			return newState
		}
		case "HideNodePanel": {
			newState.UIstate.nodePanelVisible = false
			console.log("New state (HideNodePanel)", newState)
			return newState
		}
		case "HideEdgePanel": {
			newState.UIstate.edgePanelVisible = false
			console.log("New state (HideEdgePanel)", newState)
			return newState
		}
		case "ViewEdge": {
//			console.log("SETTING EDGE IN PANEL ", action.edge)
			newState.UIstate.edgePanelVisible = true
			newState.UIstate.focusEdgeType = newState.data.model.edges[action.edge.edgeId].edgeType
			newState.UIstate.edgeInPanel = JSON.parse(JSON.stringify(newState.data.model.edges[action.edge.edgeId]))
			console.log("New state (ViewEdge)", newState)
			return newState
		}
		case "SaveEdgePanel": {
			newState.UIstate.edgeInPanel.id = newState.UIstate.edgeInPanel.fromNodeId + "_" + "_" 
				+ newState.UIstate.edgeInPanel.label + "_" + "_"
				+ newState.UIstate.edgeInPanel.toNodeId  // this overides the uuid that was set up initially.
			newState.data.model.edges[newState.UIstate.edgeInPanel.id] = newState.UIstate.edgeInPanel
			console.log("New state (SaveEdgePanel)", newState)
			return newState
		}
		case "DeleteEdgePanel": {
			newState.UIstate.edgeInPanel.id = newState.UIstate.edgeInPanel.fromNodeId + "_" + "_" 
				+ newState.UIstate.edgeInPanel.label + "_" + "_"
				+ newState.UIstate.edgeInPanel.toNodeId  // this overides the uuid that was set up initially.
			delete newState.data.model.edges[newState.UIstate.edgeInPanel.id]
			console.log("New state (DeleteEdgePanel)", newState)
			newState.UIstate.edgePanelVisible = false
			return newState
		}
		case "ChangingNodePanel": {
			switch (action.fieldType){  // needs to convert according to schema type.
				case "integer": {
					newState.UIstate.nodeInPanel[action.key] = parseInt(action.value)
					break
				}
				case "number": {
					newState.UIstate.nodeInPanel[action.key] = parseFloat(action.value)
					break
				}
				case "string": {
					let now = new Date()
					let newStr = now.toString()
					let cryptoStr = shaShort(newStr)
					newState.UIstate.nodeInPanel[action.key] = action.value
					newState.UIstate.nodeInPanel[action.key] = newState.UIstate.nodeInPanel[action.key].replace("~~i", cryptoStr)
					newState.UIstate.nodeInPanel[action.key] = newState.UIstate.nodeInPanel[action.key].replace("~~t", newStr)
					break
				}
				default: newState.UIstate.nodeInPanel[action.key] = action.value
			}  
			console.log("New state (ChangingNodePanel)", newState)
			return newState
		}
		case "ChangingEdgePanel": {
			switch (action.fieldType){  // needs to convert according to schema type.
				case "integer": {
					newState.UIstate.edgeInPanel[action.key] = parseInt(action.value)
					break
				}
				default: newState.UIstate.edgeInPanel[action.key] = action.value
			}  
			console.log("New state (ChangingEdgePanel)", newState)
			return newState
		}
		case "BuiltDropDownList": {
			console.log("BuiltDropDown from ", action.DD)
			newState.UIstate.panelDropDowns[action.DD] = action.UI
			console.log("New state (BuiltDropDownList)", newState)
			return newState
		}
		default: return state;
	}
}