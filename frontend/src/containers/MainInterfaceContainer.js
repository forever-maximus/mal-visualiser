import React, { Component } from 'react';
import { get_user_ratings } from '../mal-api';
import MainInterface from '../components/MainInterface';

class MainInterfaceContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userData: [],
      aggregateData: [
        {score: '1'}, {score: '2'}, {score: '3'}, {score: '4'}, {score: '5'}, 
        {score: '6'}, {score: '7'}, {score: '8'}, {score: '9'}, {score: '10'}, 
      ],
      userList: [],
      userSearch: '',
      userSearchError: '',
      useExample: true,
      isLoading: false,
    };
  }

  searchUser = () => {
    if (this.state.userSearch === '') {
      this.raiseSearchError('Please enter a username', false);
    } else if (this.state.userList.includes(this.state.userSearch)) {
      this.raiseSearchError('This user is already added', false);
    } else {
      this.setState({isLoading: true});
      get_user_ratings(this.state.userSearch).then(responseData => {
        if (responseData.myanimelist === null) {
          this.raiseSearchError('This user can\'t be found on myanimelist', true);
        } else if (responseData.myanimelist.hasOwnProperty('anime') === false) {
          this.raiseSearchError('This user hasn\'t added any ratings yet', true);
        } else {
          this.addUserScore(responseData);
        }
      }).catch(errorData => {
        console.log(errorData);
      });
    }
  }

  raiseSearchError = (error, cancelLoad) => {
    if (cancelLoad === true) {
      this.setState({userSearchError: error, isLoading: false});
    } else {
      this.setState({userSearchError: error});
    }
  }

  removeUser = (user) => {
    const userToRemove = user.username;
    let newUserList = this.state.userList;
    let newUserData = this.state.userData;

    const indexUserToRemove = newUserList.indexOf(userToRemove);
    if (indexUserToRemove > -1 && newUserList.length > 1) {
      newUserList.splice(indexUserToRemove, 1);
      let userDataToRemove = newUserData.findIndex(userDataItem => userDataItem.user === userToRemove);
      newUserData.splice(userDataToRemove, 1);
      
      this.removeAggregateUserScore(userToRemove).then(newAggregateData => {
        this.setState({
          userList: [...newUserList],
          userData: [...newUserData],
          aggregateData: [...newAggregateData],
        });
      });
    }
  }

  removeAggregateUserScore = (username) => {
    return new Promise((resolve, reject) => {
      let newAggregateData = this.state.aggregateData;
      newAggregateData.forEach(datapoint => {
        delete datapoint[username];
      });
      resolve(newAggregateData);
    });
  }

  addUserScore = (userMalData) => {
    let ratingData = [];
    const newUsername = this.state.userSearch;

    userMalData.myanimelist.anime.forEach(element => {
      ratingData.push({name: element.series_title, score: element.my_score});
    });
    const newScores = {user: newUsername, scores: ratingData};
    
    this.addAggregateUserScore(newUsername, ratingData).then(aggregateScores => {
      this.setState({
        userData: [...this.state.userData, newScores],
        aggregateData: [...aggregateScores],
        userList: [...this.state.userList, newUsername],
        useExample: false,
        isLoading: false,
        userSearch: '',
      });
    });
  }

  addAggregateUserScore = (user, ratingList) => {
    return new Promise((resolve, reject) => {
      let totals = {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0,
        '6': 0, '7': 0, '8': 0, '9': 0, '10': 0};

      ratingList.forEach(element => {
        if (totals.hasOwnProperty(element.score)) {
          totals[element.score] += 1;
        }
      });
      
      let aggregateScores = this.state.aggregateData;
      Object.entries(totals).forEach(([key, value], index) => {
        aggregateScores[index][user] = value;
      });
      
      resolve(aggregateScores);
    });
  }

  updateUserSearch = (ev) => {
    if (ev.key === 'Enter') {
      this.searchUser();
    } else if (this.state.userSearchError !== '') {
      this.setState({userSearch: ev.target.value, userSearchError: ''});
    } else {
      this.setState({userSearch: ev.target.value});
    }
  }

  render() {
    return (
        <MainInterface updateUserSearch={this.updateUserSearch} searchUser={this.searchUser}
            userData={this.state.userData} aggregateData={this.state.aggregateData} 
            users={this.state.userList} useExample={this.state.useExample} 
            userSearchError={this.state.userSearchError} isLoading={this.state.isLoading}
            removeUser={this.removeUser} submitUserSearch={this.submitUserSearch}
        />
    );
  }
}

export default MainInterfaceContainer;