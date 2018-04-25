import React, { Component } from 'react';
import { Input, Button, Grid } from 'semantic-ui-react';
import TotalGraph from './TotalGraph';
import AnimeTableList from './AnimeTableList';

class MainInterface extends Component {
  render() {
    return (
      <div>
        <Grid centered style={{width: '80%', margin: '0 auto'}}>
          <Grid.Row>
            <Grid.Column width={8} textAlign='right'>
              <Input placeholder='Username' onChange={this.props.updateUserSearch} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Button content='Get Stats' onClick={this.props.searchUser} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TotalGraph data={this.props.aggregateData} users={this.props.users} 
                useExample={this.props.useExample} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AnimeTableList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default MainInterface;