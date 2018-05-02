import React, { PureComponent } from 'react';
import { Table } from 'semantic-ui-react';
import { exampleListData } from '../example-data';

class AnimeTableList extends PureComponent {
  getUsers = () => {
    let rows = [];
    if (this.props.useExample === true) {
      rows.push(<Table.HeaderCell key={1}>exampleUser</Table.HeaderCell>);
      rows.push(<Table.HeaderCell key={2}>Name Example</Table.HeaderCell>);
    } else {
      this.props.users.forEach((user, i) => {
        rows.push(<Table.HeaderCell key={i+1}>{user}</Table.HeaderCell>);
      });
    }
    
    return rows;
  }

  getAnimeList = () => {
    // Add all anime to object for each user
    let workingData = {};
    const baseData = this.props.useExample ? exampleListData : this.props.userData;
    const userList = this.props.useExample ? ['exampleUser', 'Name Example'] : this.props.users;
    let username = '';
    let temp = {};
    baseData.forEach(userObject => {
      userObject.scores.forEach(anime => {
        username = userObject.user;
        if (workingData.hasOwnProperty(anime.name)) {
          // Only way I could make this work - Fix at some point!
          temp = workingData[anime.name];
          temp[username] = anime.score;
        } else {
          workingData[[anime.name]] = {[username]: anime.score};
        }
      });
    });
    
    // Fill in blanks for each user
    userList.forEach(user => {
      Object.entries(workingData).forEach(([animeName, userScores]) => {
        if (userScores.hasOwnProperty(user) !== true) {
          temp = workingData[animeName];
          temp[user] = '-';
        }
      });
    });

    // Put into array - scores are ordered according to the userlist
    let unsortedAnimeList = [];
    Object.entries(workingData).forEach(([animeName, userScores], index) => {
      unsortedAnimeList.push([animeName]);
      userList.forEach(username => {
        unsortedAnimeList[index].push(userScores[username]);
      });
    });

    const sortedAnimeList = this.sortAnimeList(unsortedAnimeList);

    let animeDetails = [], rows = [];
    sortedAnimeList.forEach((anime, i) => {
      anime.forEach((detail, j) => {
        animeDetails.push(<Table.Cell key={j}>{detail}</Table.Cell>);
      });
      rows.push(<Table.Row key={i}>{animeDetails}</Table.Row>);
      animeDetails = [];
    });

    return rows;
  }

  sortAnimeList = (unsortedAnimeList) => {
    let noneMissing = unsortedAnimeList.filter(anime => anime.includes('-') === false);
    let someMissing = unsortedAnimeList.filter(anime => anime.includes('-') === true);

    noneMissing.sort((a, b) => a[0].localeCompare(b[0]));
    someMissing.sort((a, b) => a[0].localeCompare(b[0]));
    return noneMissing.concat(someMissing);
  }

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell key={0}>Anime</Table.HeaderCell>
            { this.getUsers() }
          </Table.Row>
        </Table.Header>

        <Table.Body>
          { this.getAnimeList() }
        </Table.Body>
      </Table>
    );
  }
}

export default AnimeTableList;