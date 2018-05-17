import React, { PureComponent } from 'react';
import { Table } from 'semantic-ui-react';
import { exampleListData, exampleUserList } from '../example-data';
import './styles/AnimeTable.css';

class AnimeTableList extends PureComponent {
  getUsers = () => {
    const selectedUserList = this.props.useExample ? exampleUserList : this.props.users;

    const userHeaders = selectedUserList.map((user, i) => {
      return <Table.HeaderCell key={i+1}>{user}</Table.HeaderCell>;
    });

    const differenceLabel = selectedUserList.length > 2 ? 'Average Difference' : 'Difference';
    if (selectedUserList.length === 1) {
      return userHeaders;
    } else {
      return ([...userHeaders, <Table.HeaderCell key={userHeaders.length+1}>{differenceLabel}</Table.HeaderCell>]);
    }
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

    if (userList.length > 1) {
      this.getDifferenceScores(sortedAnimeList);
    }

    let animeDetails = [], rows = [];
    let diffColourLabel = '';
    sortedAnimeList.forEach((anime, i) => {
      anime.forEach((detail, j) => {
        if (userList.length > 1 && j === userList.length + 1) {
          diffColourLabel = this.getDifferenceColour(detail);
          animeDetails.push(<Table.Cell key={j} className={diffColourLabel}>{detail}</Table.Cell>);
        } else {
          animeDetails.push(<Table.Cell key={j}>{detail}</Table.Cell>);
        }
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

  getDifferenceScores = (animeList) => {
    let total = 0, count = 0, i = 0, j = 0;
    animeList.forEach(anime => {
      for (i=1; i < anime.length-1; i++) {
        for (j=i+1; j < anime.length; j++) {
          if (anime[i] !== '-' && anime[i] !== 0 && anime[j] !== '-' && anime[j] !== 0 && 
              anime[i] !== '0' && anime[j] !== '0') {
            total += Math.abs(anime[i] - anime[j]);
            count += 1;
          }
        }
      }

      count === 0 ? anime.push('N/A') : anime.push(this.precisionRound((total/count), 1));
      total = 0;
      count = 0;
    })
  }

  getDifferenceColour = (difference) => {
    if (difference === 0) {
      return 'equal';
    } else if (difference === 'N/A') {
      return '';
    } else if (difference < 2) {
      return 'minorDiff';
    } else if (difference >= 2 && difference < 3) {
      return 'mediumDiff';
    } else {
      return 'majorDiff';
    }
  }

  precisionRound = (number, precision) => {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
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