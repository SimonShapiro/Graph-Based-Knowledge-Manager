import * as React from "react";


export interface HelloProps { firstName: string; lastName: string; }

/*

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.compiler} {this.props.framework}!</h1>;
    }
}

*/

export const Hello = (props:HelloProps) => (
		<h1>Hello from {props.firstName} {props.lastName}!</h1>
	)