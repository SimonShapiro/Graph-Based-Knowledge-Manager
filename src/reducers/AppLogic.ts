
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
			newState.UIstate.menu[action.selected].hasMouse = true
			console.log("New state ", newState)
			return newState
		}
		case "MenuMouseOut": {
			newState.UIstate.menu[action.selected].hasMouse = false
			console.log("New state ", newState)
			return newState
		}
		case "MenuStripOnClick": {
			console.log("MenuStripOnClick", action.selected, state)
			newState.UIstate.focusNodeType = action.selected
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
			let id = state.UIstate.nodeCrumbTrail[action.trimTo]
			let nodeType = state.data.model.nodes[id].nodeType
			console.log("Restoring after trim ", id, nodeType)
			newState.UIstate.nodeDetailId = id
			newState.UIstate.focusNodeType = nodeType
			newState.UIstate.nodeCrumbTrail = state.UIstate.nodeCrumbTrail.slice(0, action.trimTo + 1)
			console.log("New state ", newState)
			return newState
		}
		default: return state;
	}
}