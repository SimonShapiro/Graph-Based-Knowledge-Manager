import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import { Hello } from "./Hello";
import { TwoTexts } from "./TwoTexts";

var people = [
		{
			firstName: "Simon",
			lastName: "Shapiro"
		},
		{
			firstName: "Mary",
			lastName: "Jane"
		}
	]

// state object
var stateObject = {
	appData: people,
	appUIState: {}
}

const appLogic = (state=people, action: Redux.Action) => {
	console.log("Initialising redux store with ",state);
	return state;
}

let store = Redux.createStore(appLogic);

const mapStateToProps = (state) => {
	return state.appData
}

const mapDispatchToProop = (dispatch) => {
	return {
		onChange: () => dispatch("Hello", {})
	}
}

store.subscribe(() =>
	console.log("At store", store.getState)
	)

export const MainContainer = () => (
	<div>
	    <Hello firstName={ people[0].firstName } lastName={ people[0].lastName } />
	    <TwoTexts rows={40} cols={200} text1={ people[1].firstName } text2={ people[1].lastName } />
	    <p>{people[1].firstName}</p>
	</div>	
)