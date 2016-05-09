import * as React from "react"

import { Hello } from "../components/Hello"

import { TextContainer } from "../containers/TextContainer"
import { MenuStripContainer } from "../containers/MenuStripContainer"
import { NodeListContainer } from "../containers/NodeListContainer"

export const App = () => (
	<div>
		<MenuStripContainer/>
		<h2>Enter text</h2>
		<TextContainer/>
		<h2>Nodes</h2>
		<NodeListContainer/>
	</div>
	)
