import React, { PureComponent } from 'react';
import { Grid } from 'semantic-ui-react';
import TotalGraph from './TotalGraph';
import AnimeTableList from './AnimeTableList';
import UserSearchInput from './UserSearchInput';
import UserList from './UserList';

class MainInterface extends PureComponent {
  render() {
    return (
      <div>
        <Grid centered style={{width: '80%', margin: '0 auto'}}>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <UserSearchInput isLoading={this.props.isLoading} updateUserSearch={this.props.updateUserSearch}
                userSearchError={this.props.userSearchError} searchUser={this.props.searchUser}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <UserList useExample={this.props.useExample} users={this.props.users}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TotalGraph data={this.props.aggregateData} users={this.props.users} 
                useExample={this.props.useExample}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AnimeTableList userData={this.props.userData} users={this.props.users} 
                useExample={this.props.useExample}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default MainInterface;