declare function require(a)

var PouchDB = require("pouchdb")

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
				dispatch({type:"LoadFile", fileName: f.name, file: data}) 
			}
			fs.readAsText(f)
		},
		saveToPouch: () => {
			console.log("Dispatching save")
			let db = new PouchDB(newState.UIstate.file)
			db.info().then((result) => {
				console.log("New state ", result, newState)
				return newState
			})
			db.put({
				_id: newState.UIstate.file,
				model: newState.data
			}).then((result) => {
				console.log("Saved ", result)
				return newState
			}).catch((error) => {
				console.log("Save error", error)
			})
			dispatch({type:"SaveToPouch", data: {}})
		}
	}
}

export const FileLoadContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(FileLoad)
