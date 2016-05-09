import * as React from "react";

import { Text } from "./Text";

export interface TwoTextsProps { rows: number, cols: number, text1: string, text2: string }

export const TwoTexts = (props:TwoTextsProps) => {
	console.log(props);
	let cols = Math.floor(props.cols/2);
	return (
		<div>
			<Text rows={props.rows} cols={cols} text={props.text1}/>
			<Text rows={props.rows} cols={cols} text={props.text2}/>
		</div>
	)
}