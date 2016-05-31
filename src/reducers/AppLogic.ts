
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
			return newState
		}
		default: return state;
	}
}