declare function require(a)
import * as React from "react";
const {Table, Column, Cell} = require("fixed-data-table");

const data = [
	"one", "two", "three"
]

export const JSONtable = (props) => {
	return (
		<Table 
			rowsCount = {data.length}
			headerHeight = {50}
			rowHeight = {50}
			width = {1000}
			height = {120}
		>
			<Column
				header = {<Cell>New ID header</Cell>}
				width = {200}
				cell = {props=> (
					<Cell>
						{data[props.rowIndex]}
					</Cell>
				)}
			/>
		</Table>
		)
}