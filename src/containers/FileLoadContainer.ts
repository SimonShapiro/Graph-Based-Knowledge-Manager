import { connect } from "react-redux";
import { Provider } from "react-redux";

import { FileLoad } from "../components/FileLoad"

const mapStateToProps = (state) => (
	{
		file: state.UIstate.file
	}
)


const mapDispatchToProps = (dispatch) => {
	return {
		onSelect: (fn) => {
			console.log("Filename ", fn.target.files[0].name)
			let f = fn.target.files[0]
			let fs = new FileReader()
			fs.onload = (e) => {
				console.log("File Contents ",f.name, f.size)   //fs.readAsDataURL(action.file)
				let data = JSON.parse(fs.result)  //  todo need lots of dq testing to accept this
				dispatch({type:"LoadFile", file: data}) 
			}
			fs.readAsText(f)
		}
	}
}

export const FileLoadContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(FileLoad)
