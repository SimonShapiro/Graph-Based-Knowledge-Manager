import { connect } from "react-redux";
import { Provider } from "react-redux";

import { Trail } from "../components/Trail"

const mapStateToProps = (state) => {
	return {
		trail: state.UIstate.nodeCrumbTrail
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		 resetTrail: () => {
		 	dispatch({type:"ResetTrail", data:{}})
		 },
		 trimTrail: (pos) => {
		 	dispatch({type:"TrimTrail", trimTo: pos})
		 } 	
	}
}

export const TrailContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(Trail)