import { connect } from "react-redux";
import { Provider } from "react-redux";

import { MenuStrip } from "../components/MenuStrip"

const mapStateToProps = (state) => (
	{
		items: Object.keys(state.UIstate.menu),
		menu: state.UIstate.menu,
		mouseTarget: Object.keys(state.UIstate.menu).map((e) => {return state.UIstate.menu[e].hasMouse}) 
	}
)
	
const mapDispatchToProps = (dispatch) => {
	return {
		mouseIn: (item) => {
			dispatch({type: "MenuMouseIn", selected: item})
		},
		mouseOut: (item) => {
			dispatch({type: "MenuMouseOut", selected: item})
		},
		clickedItem: (item) => {
			dispatch({type: "MenuStripOnClick", selected: item})
		}
	}
}

export const MenuStripContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(MenuStrip)
