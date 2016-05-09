import { connect } from "react-redux";
import { Provider } from "react-redux";

import { NodeList } from "../components/NodeList"

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
	var list = nodesAsArrayOfType(state, state.UIstate.focusNodeType).map((e) => {return JSON.stringify(e)})
	console.log("Returning ", list, list.length)
	return {
		items: list
	}
}
	
const mapDispatchToProps = (dispatch) => {
	return {
		newTextValue: (e) => {dispatch({type: "ON_CHANGE", text: e.target.value})}
	}
}

export const NodeListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(NodeList)

