import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { exampleListData } from '../example-data';

class AnimeTableList extends Component {
  getUsers = () => {
    return <Table.HeaderCell>Example User</Table.HeaderCell>;
  }

  getAnimeList = () => {
    let rows = [], complete = [], incomplete = [];
    let temp = [];
    let missingRating = false;

    Object.entries(exampleListData).forEach(([animeName, ratingList]) => {
      Object.entries(ratingList).forEach(([username, rating]) => {
        if (rating === '') {
          missingRating = true;
        }
      });
      temp[animeName] = ratingList;
      temp['name'] = animeName;
      if (missingRating) {
        incomplete.push(temp);
      } else {
        complete.push(temp);
      }
      
      missingRating = false;
      temp = [];
    });

    complete.sort((a, b) => a.name.localeCompare(b.name));
    incomplete.sort((a, b) => a.name.localeCompare(b.name));
    let full = complete.concat(incomplete);

    let userScores = [];
    full.forEach((element, i) => {
      Object.entries(element).forEach(([animeName, ratingList]) => {
        if (animeName !== 'name') {
          Object.entries(ratingList).forEach(([username, rating]) => {
            userScores.push(<Table.Cell key={i}>{rating}</Table.Cell>);
          });
        }
      });
      rows.push(<Table.Row key={i}><Table.Cell key={i}>{element.name}</Table.Cell>{userScores}</Table.Row>);
      userScores = [];
    });

    return rows;
  }

  render() {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Anime</Table.HeaderCell>
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