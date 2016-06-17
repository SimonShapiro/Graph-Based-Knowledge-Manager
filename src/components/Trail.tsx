import * as React from "react";

let nodeStyle = {
    color: "blue",
    cursor: "pointer"
}

export const Trail = (props) => {
	return (
		<div>
	        <ul>
	        {props.trail.map((t, i) =>
	        	(
	        		<li key={ i } style={ {display: "inline"} } > <a style={ nodeStyle } onClick={(e) => props.trimTrail(i)}>{ t }</a> > </li>
	        		))}
	        	<li key="reset" style={ {display: "inline"} } ><button onClick={(e)=>props.resetTrail()}>Reset Trail</button></li>
	        </ul>
		</div>	
	)
}