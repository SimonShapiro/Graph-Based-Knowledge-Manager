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
	let props = {
		panelVisible: state.UIstate.edgePanelVisible,
		objType: state.UIstate.focusEdgeType,
		schema: ((state.UIstate.focusEdgeType !== "") && (state.data.metaModel.edges[state.UIstate.focusEdgeType].schema !== undefined)) 
			? state.data.metaModel.edges[state.UIstate.focusEdgeType].schema : {},
		form: (state.UIstate.focusEdgeType !== "") ? state.data.metaModel.edges[state.UIstate.focusEdgeType].form : [],
		obj: state.UIstate.edgeInPanel,  // consider a function that returns the schema/form compliant object
		dropDowns: state.UIstate.panelDropDowns
	}
	console.log("Props for panel ", props)
	return props
}

const mapDispatchToProps = (dispatch) => {
	return {
		cancelPanel: () => {
			dispatch({type:"CancelEdgePanel"})
		},
		changeFn: (key, type, e) => {
			console.log("Local change on "+key+":"+e.target.value)
			dispatch({type:"ChangingEdgePanel", key:key, fieldType:type, value:e.target.value})
		},
		dropDownMngr: (key) => {
			dispatch(buildDropDownList(key.basedOn))
		},
		savePanel: () => {
			dispatch({type:"SaveEdgePanel"})
		},
		deletePanel: () => {
			confirm("Are you sure you want to delete this edge?") ? dispatch({type:"DeleteEdgePanel"}) : null
		},
		hidePanel: () => {
			dispatch({type: "HideEdgePanel"})
		}

	}
}

export const EdgePanelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(JSONPanel)