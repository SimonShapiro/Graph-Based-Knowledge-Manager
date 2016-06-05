
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
			if (previousSelected !== ""){
				newState.UIstate.menu[previousSelected].menuOption = MenuOptions.NOMOUSE
			}
			newState.UIstate.menu[action.selected].menuOption = MenuOptions.SELECTED
			newState.UIstate.nodeDetailId = ""
			console.log("New state ", newState)
			return newState  // probably need a full copy of state
		}
		case "NodeListAction" : {
			console.log("Nodelistaction ", action.data.action, action.data.id)
			newState.UIstate.nodeDetailId = action.data.id
			newState.UIstate.nodeCrumbTrail.push(action.data.id)  // might need a structure that includes nodeType
			console.log("New state ", newState)
			return newState
		}
		case "ResetTrail": {
			newState.UIstate.nodeCrumbTrail = state.UIstate.nodeCrumbTrail.slice(-1)
			console.log("New state ", newState)
			return newState
		}
		case "TrimTrail": {
			let previousSelected = newState.UIstate.focusNodeType
			let id = state.UIstate.nodeCrumbTrail[action.trimTo]
			let nodeType = state.data.model.nodes[id].nodeType
			console.log("Restoring after trim ", id, nodeType)
			newState.UIstate.nodeDetailId = id
			newState.UIstate.focusNodeType = nodeType
			newState.UIstate.nodeCrumbTrail = state.UIstate.nodeCrumbTrail.slice(0, action.trimTo + 1)
			if (previousSelected !== ""){
				newState.UIstate.menu[previousSelected].menuOption = MenuOptions.NOMOUSE
			}
			newState.UIstate.menu[nodeType].menuOption = MenuOptions.SELECTED
			console.log("New state ", newState)
			return newState
		}
		case "LoadFile": {
			newState.UIstate.file = action.fileName
			newState.data = action.file
			let menu = {}
			Object.keys(newState.data.metaModel.nodes).forEach((e) => {
				menu[e] = {
				label: e,
				menuOption: MenuOptions.NOMOUSE
			}})
			newState.UIstate.menu = menu
			console.log("New state ", newState)
			return newState
		}
		case "SaveToPouch": {
			return newState
		}
		default: return state;
	}
}