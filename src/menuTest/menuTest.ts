
import { connect } from "react-redux";
import { Provider } from "react-redux";

import { menu } from "./menu" 

const mapStateToProps = (state) => {
	return (
/*
	{
		menu: {
			a: {
				a1: 1,
				a2: 2
			},
			b: {
				b1: 1,
				b2: [20, 30, 40],
				b3: 3
			}
		}
	}
*/
	{
		menu: state.UIstate.completeModelBrowserMenu
	}
)}

const xxappendToMenuItem = (item) => {
	return (dispatch, getState) => {
		let state = getState()
		item["appended"] = {
			type: "appended"
		}
		dispatch({type:"MENUREFRESH"})
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		appendToMenuItem: (e, item) => {
			dispatch({type: "MENUREFRESH", value:item})  // appendToMenuItem(item)
		}
	}
}

export const menuTest = connect(
	mapStateToProps,
	mapDispatchToProps
	) (menu)
