import * as React from "react";

export const NodeList = (props) => {
	return (
	<div id="NodeList">
		<ul>
		{props.items.map((item, i) => (
			<li key={i} >
				<span id={"Item_"+i}>{item}</span>
			</li>
			)
		)}
		</ul>
	</div>
	)}


	/*
var _rows = [];
for (var i = 1; i < 10; i++) {
  _rows.push({
    id: i,
    title: 'Title ' + i,
    count: i * 1000
  });
}

//A rowGetter function is required by the grid to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};


var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count'
}
]

var Example = React.createClass({
  render: function() {
    return  (<ReactDataGrid
    columns={columns}
    rowGetter={rowGetter}
    rowsCount={_rows.length}
    minHeight={500} />);
  }
});
ReactDOM.render(<Example />, mountNode);


	*/