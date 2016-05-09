function copyObject<T> (object:T): T {
    var objectCopy = <T>{};

    for (var key in object)
    {
        if (object.hasOwnProperty(key))
        {
            objectCopy[key] = object[key];
        }
    }

    return objectCopy;
}

export const AppLogic = (state, action) => {
	console.log("Recieved action ", action);
	let newState = JSON.parse(JSON.stringify(state))   //state is a pur json object
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
			console.log("New state ", newState)
			return newState  // probably need a full copy of state
		}
		default: return state;
	}
}