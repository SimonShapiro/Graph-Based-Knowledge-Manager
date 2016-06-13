import { connect } from "react-redux";
import { Provider } from "react-redux";

import { NodePanel } from "../components/NodePanel"

const mapStateToProps = (state) => {
	return {
		panelVisible: state.UIstate.nodePanelVisible,
		nodeType: state.UIstate.focusNodeType,
		schema: ((state.UIstate.focusNodeType !== "") && (state.data.metaModel.nodes[state.UIstate.focusNodeType].schema !== undefined)) 
			? state.data.metaModel.nodes[state.UIstate.focusNodeType].schema : {},
		form: (state.UIstate.focusNodeType !== "") ? state.data.metaModel.nodes[state.UIstate.focusNodeType].form : [],
		node: state.UIstate.nodeInPanel
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		cancelNodePanel: () => {
			dispatch({type:"CancelNodePanel"})
		},
		changeFn: (key, type, e) => {
			console.log("Local change on "+key+":"+e.target.value)
			dispatch({type:"ChangingNodePanel", key:key, fieldType:type, value:e.target.value})
		},
		saveNodePanel: () => {
			dispatch({type:"SaveNodePanel"})
		}

	}
}

export const NodePanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(NodePanel)