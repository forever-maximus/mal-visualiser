import React, { Component } from 'react';
import { Input, Button, Grid, Label } from 'semantic-ui-react';
import TotalGraph from './TotalGraph';
import AnimeTableList from './AnimeTableList';

class MainInterface extends Component {
  getInputErrors = () => {
    if (this.props.userSearchError !== '') {
      return <div><Label basic color='red' pointing>{this.props.userSearchError}</Label></div>;
    }
  }
  
  render() {
    return (
      <div>
        <Grid centered style={{width: '80%', margin: '0 auto'}}>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Input placeholder='Username' onChange={this.props.updateUserSearch} 
                action={ <Button icon='search' content='Get Stats' onClick={this.props.searchUser}/> }
              />
              {this.getInputErrors()}
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
              <AnimeTableList userData={this.props.userData} users={this.props.users} 
                useExample={this.props.useExample} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default MainInterface;