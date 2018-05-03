import React, { PureComponent } from 'react';
import { Input, Button, Label } from 'semantic-ui-react';

class UserSearchInput extends PureComponent {
  getInputErrors = () => {
    if (this.props.userSearchError !== '') {
      return <div><Label basic color='red' pointing>{this.props.userSearchError}</Label></div>;
    }
  }
  
  render() {
    return (
      <div>
        <Input placeholder='Username' onKeyUp={this.props.updateUserSearch}
          action={ <Button icon='search' content='Get Stats' onClick={this.props.searchUser}/> } 
          loading={this.props.isLoading} iconPosition='left' icon='user' 
        />
        {this.getInputErrors()}
      </div>
    );
  }
}

export default UserSearchInput;