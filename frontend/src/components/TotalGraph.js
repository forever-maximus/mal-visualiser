import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const colourList = [
  '#2196f3',
  '#f44336',
  '#ffca28',
  '#43a047',
  '#9c27b0',
];

class TotalGraph extends Component {
  getGraphLines = () => {
    let lines = [];
    if (this.props.useExample === true) {
      lines.push(<Line key={0} dataKey='exampleUser' type='monotone' stroke='#82ca9d' />);
    } else {
      this.props.users.forEach((element, i) => {
        lines.push(<Line dataKey={element} key={i} type='monotone' stroke={colourList[i%5]} />)
      });
    }
    return lines;
  }

  render() {
    return (
      <div style={{width: '80%', margin: '0 auto'}}>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }} 
              data={this.props.useExample ? exampleData : this.props.data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='score' />
            <YAxis />
            <Tooltip />
            <Legend />
            {this.getGraphLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default TotalGraph;