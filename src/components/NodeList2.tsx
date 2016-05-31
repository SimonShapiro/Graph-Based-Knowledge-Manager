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
                <li key={i}>{item.fromNodeId} {item.label} <span style={nodeMenuStyle} onClick={(e)=>props.metaNodeSurf(item.toNodeId)}>{item.toNodeId}</span></li>
                )
            })}
        </ul>
        <ul>
            {props.metaTo.map((item, i, a) => {
                return (
                <li key={i}><span style={nodeMenuStyle} onClick={(e)=>props.metaNodeSurf(item.fromNodeId)}>{item.fromNodeId}</span> {item.label} {item.toNodeId}</li>
                )
            })}
        </ul>
        <h3>Items:</h3>
        <table style={ {border: "1px solid grey"} }>
            <thead style={ {backgroundColor:"lightgrey"} }>
                <tr>
                    <th width="20%">Actions</th>
                    <th width="10%">Id</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>    
                {items.map((item) => {
                            return (
                                <tr key={ item.id }>
                                    <td style={nodeMenuStyle}><a onClick={(e) => props.clickedAction("View", item)}>View</a> | <a href="">Edit</a> | <a href="">Delete</a></td>
                                    <td>{ item.id }</td>
                                    <td>{ item.name }</td>
                                </tr>
                                )
                        })}
            </tbody>
        </table>
        <h3>Crumbs</h3>
    </div>
    )
}    