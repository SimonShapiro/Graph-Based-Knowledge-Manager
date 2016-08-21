import { connect } from "react-redux";
import { Provider } from "react-redux";

import { SearchableMenu } from "../components/SearchableMenu"
 
const mapStateToProps = (state) => {
	return {
		displayText: state.UIstate.nodeSearchFilter
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		changeSearchFilter: (e) => {
			dispatch({type:"ChangeNodeSearchFilter", filterOn:e.target.value})
		}		
	}
}

export const SearchableNodeListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(SearchableMenu)