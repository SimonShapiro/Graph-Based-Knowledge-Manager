import { connect } from "react-redux";
import { Provider } from "react-redux";

import { NodeDisplay } from "../components/NodeDisplay"

const objectToSchema = (obj, name) => {
	let keys = Object.keys(obj)
	let propList = {}
	keys.forEach((k) => {
		propList[k] = {
			type: Array.isArray(obj[k]) ? 'Array' : typeof(obj[k])
		}
	})
	let schema = {
		title: name,
		type: "object",
		properties: propList}
	return schema
}

const relatedFromThis = (state, nodeId: string) => {
	if (state.data !== undefined){ 
		let nodes = state.data.model.nodes      // this sets a pointer
		let edges = state.data.model.edges      // this sets a pointer
		let edgeIterator = Object.keys((edges))
		let sub = edgeIterator.filter((e) => {
			return edges[e].fromNodeId == nodeId
		}).map((e) => {
			return {
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
	let node = (state.data !== undefined) ? state.data.model.nodes[state.UIstate.nodeDetailId] : {}
	let schema = (node === undefined) ? {} : objectToSchema(node, node.nodeType)  //todo get the schema from the metamodel
	return {
		trail: state.UIstate.nodeCrumbTrail,
		node: node,
		schema: schema,
		outbound: relatedFromThis(state, state.UIstate.nodeDetailId),    // changes state as a side-effect
		inbound: relatedToThis(state, state.UIstate.nodeDetailId)		// changes state as a side-effect
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		nodeSurf: (id, type) => {		

		 	dispatch({type:"MenuStripOnClick", selected: type})  // not sure if this should change the uior not

			dispatch({type: "NodeListAction", data: {
		 		action: "view",
		 		id: id,
		 		nodeType: type
		 	}})},
		 resetTrail: () => {
		 	dispatch({type:"ResetTrail", data:{}})
		 },
		 trimTrail: (pos) => {
		 	dispatch({type:"TrimTrail", trimTo: pos})
		 } 	
	}
}

export const NodeDisplayContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(NodeDisplay)