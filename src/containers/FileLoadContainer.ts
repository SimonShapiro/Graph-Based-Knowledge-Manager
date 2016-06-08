declare function require(a)

var PouchDB = require("pouchdb")

import { connect } from "react-redux";
import { Provider } from "react-redux";

import { FileLoad } from "../components/FileLoad"

const mapStateToProps = (state) => (
	{
		fileNames: state.UIstate.fileNames,
		file: state.UIstate.file,
		showFileNames: state.UIstate.showFileNames
	}
)

const loadFile = (fn) => {
	return (dispatch, getState) => {
		alert("Loading file");
		dispatch({type: "FileLoading"})
		console.log("Filename ", fn.target.files[0].name)
		let f = fn.target.files[0]
		let fs = new FileReader()
		fs.onload = (e) => {
			console.log("File Contents ",f.name, f.size)   //fs.readAsDataURL(action.file)
			let data = JSON.parse(fs.result)  //  todo need lots of dq testing to accept this
			dispatch({type:"LoadFile", fileName: f.name, file: data}) 
		}
		fs.readAsText(f)
	}
}

const saveFileInPouch = () => {
	return (dispatch, getState) => {
		let state = getState()
		alert("Saving to pouch")
		console.log("Dispatching save", state)
		dispatch({type:"Saving to pouch"})
		let db = new PouchDB(state.UIstate.pouch)
		db.info().then((result) => {
			console.log("DB status", result)
			alert(JSON.stringify(result))
		})
		// need to check whether the file doc already exists
		let newData = {
			_id: state.UIstate.file,
			_rev: (state.UIstate.lastRevision !== undefined) ? state.UIstate.lastRevision : undefined,
			model: state.data
		}
		console.log("preparing data for save ", newData)
		db.put(newData).then((result) => {
			console.log("Saved ", result)
			dispatch({type: "SaveToPouch", data: result})
		}).catch((error) => {
			console.log("Save error", error)
			alert("Error saving doc "+JSON.stringify(error))
		})
	}
}

const deletePouchLocal = () => {
	return (dispatch, getState) => {
		dispatch({type:"Deleting Pouch Local"})
		let state = getState()
		let dbName = state.UIstate.pouch
		if (confirm("Are you sure you want to delete "+dbName)) {
			let db = new PouchDB(dbName)
			db.destroy().then( (result) => {
				dispatch({type: "DeletePouchLocalDone", action: result})
			})
		} 
	}
}

const showFileNames = (focus) => {
	return (dispatch, getState) => {
		let state = getState()
		let dbName = state.UIstate.pouch
		let db = new PouchDB(dbName)
		db.allDocs().then((result) => {
			let docs = result.rows.map((e) => {return e.id})
			console.log("Docs ", docs)
//			dispatch({type:"RefreshDocList ", docs:docs})
			dispatch({type:"ShowFileList", focus:focus, docs:docs})
	}).catch((error) => {
		console.log("Pouch error ", error)
	})
	}
}

/*
const mapDispatchToProps = (dispatch) => {
	return {
	}
}

*/

const mapDispatchToProps = (dispatch) => {
	return {
		onSelect: (fn) => {
			dispatch(loadFile(fn))
		},
		saveToPouch: () => {
			dispatch(saveFileInPouch())
		},
		deletePouch: () => {
			dispatch(deletePouchLocal())
		},
		fileNameChange: (e) => {
			dispatch({type:"FileNameChange", data:e.target.value})
		},
		fileNameFocus: (focus) => {
			console.log("you have focus")
			dispatch(showFileNames(focus))
		},
		mouseIn: (item) => {
			dispatch({type: "FileMenuMouseIn", selected: item})
		},
		mouseOut: (item) => {
			dispatch({type: "FileMenuMouseOut", selected: item})
		},
		clickedItem: (item) => {
			dispatch({type: "FileMenuOnClick", selected: item})
		}
	}
}

export const FileLoadContainer = connect(
	mapStateToProps,
	mapDispatchToProps
	)(FileLoad)
