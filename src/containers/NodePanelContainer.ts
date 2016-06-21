import { connect } from "react-redux";
import { Provider } from "react-redux";

import { JSONPanel } from "../components/JSONPanel"

const buildDropDownList = (dropDownType) => {
	return (dispatch, getState) => {
	let state = getState()
	dispatch({type:"BuiltDropDownList", UI:Object.keys(state.data.model.nodes).filter((e, i) => {
		return (state.data.model.nodes[e].nodeType === dropDownType)}
		), DD:dropDownType})
}}

const mapStateToProps = (state) => {
	return {
		panelVisible: state.UIstate.nodePanelVisible,
		objType: state.UIstate.focusNodeType,
		schema: ((state.UIstate.focusNodeType !== "") && (state.data.metaModel.nodes[state.UIstate.focusNodeType].schema !== undefined)) 
			? state.data.metaModel.nodes[state.UIstate.focusNodeType].schema : {},
		form: (state.UIstate.focusNodeType !== "") ? state.data.metaModel.nodes[state.UIstate.focusNodeType].form : [],
		obj: state.UIstate.nodeInPanel,  // consider a function that returns the schema/form compliant object
		dropDowns: state.UIstate.panelDropDowns
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
		dropDownMngr: (key) => {
			dispatch(buildDropDownList(key.basedOn))
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