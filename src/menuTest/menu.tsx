import * as React from "react";
import { UUID } from "../utils/UUID"

export const menu = (props) => {

	const getItems = (obj) => {
			let keys = Object.keys(obj)
			return (
				<ul>
					{ keys.map((itm, i) => 
						{
							if (typeof(obj[itm]) == "object") {
								return (
									<div key={ UUID() }>
										<button onClick={ (e, itmValue) => props.appendToMenuItem(e, obj[itm]) }>{ (obj[itm].open) ? "-" : "+"}</button>
										{ (obj[itm].type === "node") ? <b>{ itm }</b> : <span>{ itm }</span> } 	
										{ ((typeof(obj[itm]) == "object")&&(obj[itm].open)) ? getItems(obj[itm]) : null  }
									</div>
								)								
							}
						}
					)}	
				</ul>
		
				)
	}

	return(
		<div>
			<p>Menu 2.0</p>
			{ getItems(props.menu) }
		</div>
	)
}
