import * as React from "react"

import { FileLoadContainer } from "../containers/FileLoadContainer"
import { TrailContainer } from "../containers/TrailContainer"
import { MenuStripContainer } from "../containers/MenuStripContainer"
import { JSONtable } from "../tableView/JSONtable"
import { NodeListContainer } from "../containers/NodeListContainer"
import { SearchableNodeListContainer } from "../containers/SearchableNodeListContainer"

export const App = () => (
	<div>
		<FileLoadContainer/>
		<MenuStripContainer/>
		<SearchableNodeListContainer/>
		<NodeListContainer/>
		<TrailContainer/>
	</div>	
	)


/*

<JSONtable/>  Experiment before <Searchable...
*/