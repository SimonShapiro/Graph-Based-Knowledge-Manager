import * as React from "react";

let nodeMenuStyle = {
    color: "blue",
    cursor: "pointer"
}

export const NodeList2 = (props) => {

    let items = props.items

    return (
    <div id="NodeList">
        <h2>{props.heading}</h2>
        <h3>Possible relationships:</h3>
        <ul>
            {props.metaFrom.map((item, i, a) => {
                return (
                <li key={"From_"+i}>{item.fromNodeId} {item.label} <span style={nodeMenuStyle} onClick={(e)=>props.metaNodeSurf(item.toNodeId)}>{item.toNodeId}</span></li>
                )
            })}
            {props.metaTo.map((item, i, a) => {
                return (
                <li key={"To_"+i}><span style={nodeMenuStyle} onClick={(e)=>props.metaNodeSurf(item.fromNodeId)}>{item.fromNodeId}</span> {item.label} {item.toNodeId}</li>
                )
            })}
        </ul>
        <h3>Items:</h3>
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
    </div>
    )
}    