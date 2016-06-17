import * as React from "react"

import { FileLoadContainer } from "../containers/FileLoadContainer"
import { TrailContainer } from "../containers/TrailContainer"
import { MenuStripContainer } from "../containers/MenuStripContainer"
import { NodeListContainer } from "../containers/NodeListContainer"

export const App = () => (
	<div>
		<FileLoadContainer/>
		<MenuStripContainer/>
		<TrailContainer/>
		<NodeListContainer/>
	</div>
	)
