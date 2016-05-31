import * as React from "react"

import { Hello } from "../components/Hello"

import { TextContainer } from "../containers/TextContainer"
import { MenuStripContainer } from "../containers/MenuStripContainer"
import { NodeListContainer } from "../containers/NodeListContainer"
import { NodeDisplayContainer } from "../containers/NodeDisplayContainer"

export const App = () => (
	<div>
		<MenuStripContainer/>
		<NodeListContainer/>
		<NodeDisplayContainer/>
	</div>
	)


/*
		<h2>Enter text</h2>
		<TextContainer/>
*/