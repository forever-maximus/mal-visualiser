import React, { PureComponent } from 'react';
import { Grid } from 'semantic-ui-react';
import TotalGraph from './TotalGraph';
import AnimeTableList from './AnimeTableList';
import UserSearchInput from './UserSearchInput';
import UserList from './UserList';
import './styles/MainInterface.css';

class MainInterface extends PureComponent {
  render() {
    return (
      <div>
        <Grid centered className='grid-container'>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <UserSearchInput isLoading={this.props.isLoading} updateUserSearch={this.props.updateUserSearch}
                userSearchError={this.props.userSearchError} searchUser={this.props.searchUser}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <UserList useExample={this.props.useExample} users={this.props.users} 
                removeUser={this.props.removeUser}/>
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