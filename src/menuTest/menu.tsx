import * as React from "react";

const getItems = (obj) => {
		let keys = Object.keys(obj)
		return (
			<ul>
				{ keys.map((item, i) => 
					{
						return (<li key={ i }>
							{ item } : 	
									{ ((typeof(obj[item]) == "object")) ? getItems(obj[item]) : obj[item]  }
								</li>)
					}
					)}
			</ul>
	
			)
}

export const menu = (props) => {
	return(
		<div>
			<p>Menu 2.0</p>
			<p>{ JSON.stringify(props.location.query) }</p>
			{ getItems(props.menu) }
		</div>
	)
}
