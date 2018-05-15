import React, { PureComponent } from 'react';
import AnimeTableList from './AnimeTableList';
import About from './About';
import { Tab } from 'semantic-ui-react';

class DetailsInterface extends PureComponent {
  getTabs = () => {
    return [
      { 
        menuItem: 'Anime Table',
        render: () => <Tab.Pane><AnimeTableList userData={this.props.userData} users={this.props.users} 
            useExample={this.props.useExample}/></Tab.Pane>
      },
      {
        menuItem: 'About',
        render: () => <Tab.Pane><About/></Tab.Pane>
      },
    ];
  }

  render() {
    return (
      <Tab panes={this.getTabs()} />
    );
  }
}

export default DetailsInterface;