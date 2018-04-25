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
      useExample: true,
    };
  }

  searchUser = () => {
    if (this.state.userSearch !== '') {
      get_user_ratings(this.state.userSearch).then(responseData => {
        this.addUserScore(responseData);
      }).catch(errorData => {
        console.log(errorData);
      });
    } else {
      console.log('Username required!');
    }
  }

  addUserScore = (userMalData) => {
    let ratingData = [];
    userMalData.myanimelist.anime.forEach(element => {
      ratingData.push({name: element.series_title, score: element.my_score})
    });
    const newScores = {user: this.state.userSearch, scores: ratingData};
    let newUserList = this.state.userList;
    newUserList.push(this.state.userSearch);
    
    this.addAggregateUserScore(this.state.userSearch, ratingData).then(aggregateScores => {
      this.setState({
        userData: [...this.state.userData, newScores],
        aggregateData: aggregateScores,
        userList: newUserList,
        useExample: false,
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
      let index = 0;
      Object.entries(totals).forEach(([key, value]) => {
        aggregateScores[index][user] = value;
        index += 1;
      });
      
      resolve(aggregateScores);
    });
  }

  updateUserSearch = (ev) => {
    this.setState({userSearch: ev.target.value});
  }

  render() {
    return (
        <MainInterface updateUserSearch={this.updateUserSearch} searchUser={this.searchUser}
            data={this.state.userData} aggregateData={this.state.aggregateData} 
            users={this.state.userList} useExample={this.state.useExample}
        />
    );
  }
}

export default MainInterfaceContainer;