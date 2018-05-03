import React, { PureComponent } from 'react';
import { List, Label, Icon } from 'semantic-ui-react';
import { exampleUserList } from '../example-data';

class UserList extends PureComponent {
  getSelectedUsers = () => {
    const selectedUserList = this.props.useExample ? exampleUserList : this.props.users;

    return selectedUserList.map((username, i) => {
      return <List.Item key={i}><Label>{username}</Label></List.Item>;
    });
  }
  
  render() {
    return (
      <List horizontal>
        {this.getSelectedUsers()}
      </List>
    );
  }
}

export default UserList;