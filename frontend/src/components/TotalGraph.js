import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { exampleAggregateData, exampleUserList, exampleColourList } from '../example-data';
import './styles/TotalGraph.css';

const colourList = [
  '#2196f3',
  '#f44336',
  '#ffca28',
  '#43a047',
  '#9c27b0',
];

class TotalGraph extends PureComponent {
  getGraphLines = () => {
    const selectedUserList = this.props.useExample ? exampleUserList : this.props.users;
    const selectedColourList = this.props.useExample ? exampleColourList : colourList;

    return selectedUserList.map((element, i) => {
      return <Line dataKey={element} key={i} type='monotone' stroke={selectedColourList[i%5]} />;
    });
  }

  render() {
    return (
      <div className='graph-container'>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }} 
              data={this.props.useExample ? exampleAggregateData : this.props.data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='score' />
            <YAxis />
            <Tooltip wrapperStyle={{opacity: 0.98, borderRadius: '5px'}}/>
            <Legend />
            {this.getGraphLines()}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default TotalGraph;