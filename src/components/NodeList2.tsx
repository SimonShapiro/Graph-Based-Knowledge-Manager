import * as React from "react";

import { NodePanelContainer } from "../containers/NodePanelContainer"
import { EdgePanelContainer } from "../containers/EdgePanelContainer"
import { EdgeListContainer } from "../containers/EdgeListContainer"

let nodeMenuStyle = {
    color: "blue",
    cursor: "pointer"
}

export const NodeList2 = (props) => {

    let items = props.items

    return (
    <div id="NodeList">
        <table style={ {border: "1px solid grey",  width:"100%"} }>
            <thead style={ {backgroundColor:"lightgrey"} }>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>    
                {items.map((item) => {
                            return (
                                <tr key={ item.id } style={nodeMenuStyle} onClick={(e) => props.clickedAction("View", item)}>
                                    <td>{ item.id }</td>
                                    <td>{ item.name }</td>
                                </tr>
                                )
                        })}
            </tbody>
        </table>
        <button onClick={ (e) => props.newNodeOfType(props.heading) }>New</button>
        <NodePanelContainer/>
        <EdgeListContainer/>
        <EdgePanelContainer/>
        <h3>Possible relationships:</h3>
                {props.metaFrom.map((item, i, a) => {
                    return (
                    <div key={"From_"+i}>
                        <span><button onClick={ (e) => props.newEdgeOfType(item.id) }>New</button>  </span>
                        <span >{item.fromNodeId} {item.label} <span style={nodeMenuStyle} onClick={(e)=>props.metaNodeSurf(item.toNodeId)}>{item.toNodeId}</span></span>
                    </div>
                    )
                })}
                {props.metaTo.map((item, i, a) => {
                    return (
                    <div key={"To_"+i}>
                        <span><button onClick={ (e) => props.newEdgeOfType(item.id) }>New</button>  </span>
                        <span ><span style={nodeMenuStyle} onClick={(e)=>props.metaNodeSurf(item.fromNodeId)}>{item.fromNodeId}</span> {item.label} {item.toNodeId}</span>
                    </div>
                    )
                })}
    </div>
    )
}    