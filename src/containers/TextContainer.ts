import { connect } from "react-redux";
import { Provider } from "react-redux";

import { Text } from "../components/Text"

const nodesAsArrayOfType = (state, nodeType: string) => {
	console.log("Going for nodes of type ", nodeType)
		let a = state.data.model.nodes
        let k = Object.keys(a);
        let sub = k.filter((e) => {
                        return a[e].nodeType == nodeType
        }).map((e) => a[e])
    console.log("Got nodes ", sub)    
        return sub
}

const mapStateToProps = (state) => {
//	console.log("State ", state)
	return {
		text: JSON.stringify(nodesAsArrayOfType(state, state.UIstate.focusNodeType), null, 2)
	}
}
	
const mapDispatchToProps = (dispatch) => {
	return {
		newTextValue: (e) => {dispatch({type: "ON_CHANGE", text: e.target.value})}
	}
}

export const TextContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Text)

