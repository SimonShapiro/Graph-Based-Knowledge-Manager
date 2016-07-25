
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
		menu: state.data
	}
)}

export const menuTest = connect(
	mapStateToProps
	) (menu)
