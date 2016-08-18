import { connect } from "react-redux";
import { Provider } from "react-redux";

import { JSONPanel } from "../components/JSONPanel"

const mapStateToProps = (state) => {
	return {
		panelVisible: state.UIstate.nodePanelVisible,
		objType: state.UIstate.focusNodeType,
		schema: ((state.UIstate.focusNodeType !== "") && (state.data.metaModel.nodes[state.UIstate.focusNodeType].schema !== undefined)) 
			? state.data.metaModel.nodes[state.UIstate.focusNodeType].schema : {},
		form: (state.UIstate.focusNodeType !== "") ? state.data.metaModel.nodes[state.UIstate.focusNodeType].form : [],
		obj: state.UIstate.nodeInPanel,  // consider a function that returns the schema/form compliant object
		dropDowns: (state.data !== undefined) ? state.data.model.nodes : undefined  //  need to provide all nodes to support drop down based on nodes
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		cancelPanel: () => {
			dispatch({type:"CancelNodePanel"})
		},
		changeFn: (key, type, e) => {
			console.log("Local change on "+key+":"+e.target.value)
			dispatch({type:"ChangingNodePanel", key:key, fieldType:type, value:e.target.value})
		},
		savePanel: () => {
			dispatch({type:"SaveNodePanel"})
		},
		deletePanel: () => {
			confirm("Warning! This will delete all edges connected to this node.  Are you sure?") ? dispatch({type:"DeleteNodePanel"}) : null
		},
		hidePanel: () => {
			dispatch({type:"HideNodePanel"})
		}

	}
}

export const NodePanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(JSONPanel)