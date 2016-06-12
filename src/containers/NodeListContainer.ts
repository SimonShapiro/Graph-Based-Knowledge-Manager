import { connect } from "react-redux";
import { Provider } from "react-redux";

import { NodeList2 } from "../components/NodeList2"

const nodesAsArrayOfType = (state, nodeType: string) => {
	if (state.data !== undefined){
		let a = state.data.model.nodes
	    let k = Object.keys(a);
	    let sub = k.filter((e) => {
	                    return a[e].nodeType == nodeType
	    }).map((e) => a[e])
	    return sub
	}
	else return []
}

const relatedMetaFromThis = (state, nodeType: string) => {
	if (state.data !== undefined){
		let nodes = state.data.metaModel.nodes
		let edges = state.data.metaModel.edges
		let edgeIterator = Object.keys((edges))
		let sub = edgeIterator.filter((e) => {
			return edges[e].fromNodeId == nodeType
		}).map((e) => edges[e])
		return sub
	}
	else return []
}

const relatedMetaToThis = (state, nodeType: string) => {
	if (state.data !== undefined) {
		let nodes = state.data.metaModel.nodes
		let edges = state.data.metaModel.edges
		let edgeIterator = Object.keys((edges))
		let sub = edgeIterator.filter((e) => {
			return edges[e].toNodeId == nodeType
		}).map((e) => edges[e])
		return sub
	}
	else return []
}

const mapStateToProps = (state) => {
	var list = nodesAsArrayOfType(state, state.UIstate.focusNodeType).map((e) => {return e})
	return {
		heading: state.UIstate.focusNodeType,
		items: list,
		editControl: state.UIstate.editControlForNodeList,
		metaFrom: relatedMetaFromThis(state, state.UIstate.focusNodeType),
		metaTo: relatedMetaToThis(state, state.UIstate.focusNodeType)
	}
}
	
const mapDispatchToProps = (dispatch) => {
	let fns = {
//		newTextValue: (e) => {dispatch({type: "ON_CHANGE", text: e.target.value})},
		clickedAction: (action, rowData) => {
			console.log(action, rowData)
		 	dispatch({type: "NodeListAction", data: {
		 		action: action,
		 		id: rowData.id,
		 		nodeType: rowData.nodeType
		 	}})
		 },
		 metaNodeSurf: (item) => {
		 	dispatch({type:"MenuStripOnClick", selected: item})
		 },
		 newNodeOfType: (nodeType) => {
		 	dispatch({type:"NewNodeOfType", nodeType: nodeType})
		 }	 
	}
	console.log("Functions to run ", fns)
	return fns
}

export const NodeListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(NodeList2)
