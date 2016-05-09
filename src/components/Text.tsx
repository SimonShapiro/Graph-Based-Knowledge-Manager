import * as React from "react";

//export interface TextProps { text: string }

export const Text = (props) => (
	<textarea rows="10" cols="120" value={props.text} onChange={(e) => props.newTextValue(e)} />
	)