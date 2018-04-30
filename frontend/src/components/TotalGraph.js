import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { exampleAggregateData } from '../example-data';

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
      lines.push(<Line key={0} dataKey='exampleUser' type='monotone' stroke='#f44336' />);
      lines.push(<Line key={1} dataKey='Name Example' type='monotone' stroke='#43a047' />);
    } else {
      this.props.users.forEach((element, i) => {
        lines.push(<Line dataKey={element} key={i} type='monotone' stroke={colourList[i%5]} />)
      });
    }
    return lines;
  }

  render() {
    return (
      <div style={{width: '85%', margin: '0 auto'}}>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }} 
              data={this.props.useExample ? exampleAggregateData : this.props.data}>
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