import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const exampleData = [
  {score: '1', exampleUser: 0},
  {score: '2', exampleUser: 0},
  {score: '3', exampleUser: 2},
  {score: '4', exampleUser: 4},
  {score: '5', exampleUser: 0},
  {score: '6', exampleUser: 10},
  {score: '7', exampleUser: 12},
  {score: '8', exampleUser: 15},
  {score: '9', exampleUser: 8},
  {score: '10', exampleUser: 4},
];

class TotalGraph extends Component {
  getGraphLines = () => {
    let lines = [];
    if (this.props.useExample === true) {
      lines.push(<Line key={0} dataKey='exampleUser' type='monotone' stroke='#82ca9d' />);
    } else {
      this.props.users.forEach((element, i) => {
        lines.push(<Line dataKey={element} key={i} type='monotone' stroke='#82ca9d' />)
      });
    }
    return lines;
  }

  render() {
    return (
      <div>
        <LineChart width={500} height={300} 
            data={this.props.useExample ? exampleData : this.props.data} >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='score' />
          <YAxis />
          <Tooltip />
          <Legend />
          {this.getGraphLines()}
        </LineChart>
      </div>
    );
  }
}

export default TotalGraph;