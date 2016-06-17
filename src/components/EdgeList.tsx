import * as React from "react";

let nodeStyle = {
    color: "blue",
    cursor: "pointer"
}
let detailDivStyle = {
	backgroundColor: "#f9f9f9",
	padding: "1px 5px 5px 5px"
}

export const EdgeList = (props) => {
		return (
		<div id="EdgeList" style={ detailDivStyle }>
			<p>Related:</p>
	        <ul>
	            {props.outbound.map((item, i, a) => {
	                return (
	                <li key={"From_"+i}><button onClick={ (e) => props.viewEdge(item) }>View</button><i>This { item.fromType }</i> {item.label} <span style={nodeStyle} onClick={(e)=>props.nodeSurf(item.toNodeId, item.toType)}>{item.toName}</span></li>
	                )
	            })}
	            {props.inbound.map((item, i, a) => {
	                return (
	                <li key={"To_"+i}><button onClick={ (e) => props.viewEdge(item) }>View</button><span style={nodeStyle} onClick={(e)=>props.nodeSurf(item.fromNodeId, item.fromType)}>{item.fromName}</span> {item.label} <i>this { item.toType }</i></li>
	                )
	            })}
	        </ul>
		</div>
		)	
	}