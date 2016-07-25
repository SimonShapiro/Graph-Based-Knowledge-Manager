import { connect } from "react-redux";
import { Provider } from "react-redux";

import { exportPage } from "./exportPage"

const mapStateToProps = (state) => {
	return {
		model: state.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		generateFile: (text) => {
			let textFile	
		    let data = new Blob([text], {type: 'text/plain'});

		    // If we are replacing a previously generated file we need to
		    // manually revoke the object URL to avoid memory leaks.
		    if (textFile !== null) {
		      window.URL.revokeObjectURL(textFile);
		    }

		    textFile = window.URL.createObjectURL(data);

		    // returns a URL you can use as a href
		    return textFile;
		}
	}
}

export const exportModelContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	) (exportPage)	
