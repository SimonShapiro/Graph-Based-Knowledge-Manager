import { connect } from "react-redux";
import { Provider } from "react-redux";

import { EdgeList } from "../components/EdgeList"

const relatedFromThis = (state, nodeId: string) => {
	if (state.data !== undefined){ 
		let nodes = state.data.model.nodes      // this sets a pointer
		let edges = state.data.model.edges      // this sets a pointer
		let edgeIterator = Object.keys((edges))
		let sub = edgeIterator.filter((e) => {
			return edges[e].fromNodeId == nodeId
		}).map((e) => {
			return {
				"edgeId": e,
				"fromNodeId": edges[e].fromNodeId,
				"toNodeId": edges[e].toNodeId,
				"fromName": nodes[edges[e].fromNodeId].name, 
				"fromType": nodes[edges[e].fromNodeId].nodeType,
				"toType": nodes[edges[e].toNodeId].nodeType,
				"toName": nodes[edges[e].toNodeId].name,
				"label": state.data.metaModel.edges[edges[e].edgeType].label.toLowerCase()  // consider forcing to lowercase
			}
		})
		return sub
	}
	else return []
}

const relatedToThis = (state, nodeId: string) => {
	if (state.data !== undefined) {
		let nodes = state.data.model.nodes   // this sets a pointer
		let edges = state.data.model.edges   // this sets a pointer
		let edgeIterator = Object.keys((edges))
		let sub = edgeIterator.filter((e) => {
			return edges[e].toNodeId == nodeId
		})
		.map((e) => {
			return {
				"edgeId": e,
				"fromNodeId": edges[e].fromNodeId,
				"toNodeId": edges[e].toNodeId,
				"fromName": nodes[edges[e].fromNodeId].name,  
				"fromType": nodes[edges[e].fromNodeId].nodeType,
				"toType": nodes[edges[e].toNodeId].nodeType,
				"toName": nodes[edges[e].toNodeId].name,
				"label": state.data.metaModel.edges[edges[e].edgeType].label.toLowerCase()  // consider forcing to lowercase
			}
		})
		return sub
	}
	else return []
}


const mapStateToProps = (state) => {
	return {
		outbound: relatedFromThis(state, state.UIstate.nodeDetailId),
		inbound: relatedToThis(state, state.UIstate.nodeDetailId)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		viewEdge: (edge) => {
			dispatch({type:"ViewEdge", edge: edge})
		},
		nodeSurf: (id, type) => {		

		 	dispatch({type:"MenuStripOnClick", selected: type})  // not sure if this should change the uior not

			dispatch({type: "NodeListAction", data: {
		 		action: "view",
		 		id: id,
		 		nodeType: type
		 	}})}
	}
}

export const EdgeListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(EdgeList)