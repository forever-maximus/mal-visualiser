import React from 'react';

const About = () => {
  return (
    <div>
      <h3>Why did I build this?</h3>
      <p>The main motivation behind making this visualisation/comparison tool was the lack of
        functionality present in the comparison tool on myanimelist. I wanted to compare between
        more than just two users at once, I wanted it to present a high level view of all ratings,
        and some insights or statistics between the users. So after looking around and finding nothing
        out there, I decided to do it myself.
      </p>

      <h3>What does it do and how to use it?</h3>
      <p>This tool was built with simplicity in mind. All you need to do is type a username from 
        myanimelist into the search input and click the 'Get Stats' button. It will then pull down 
        all their anime rating data and add it to the data analysis. You can do this for many users, 
        and if you want to remove a user simply click the 'x' button on their username label in the 
        list of active usernames below the search input.
      </p>
      <p>
        The high level visualisation can be found directly below the search input. This gives a general 
        overview of how a user distributes their ratings. This is useful if you quickly want to find 
        out which of your friends is the most generous or critical.
      </p>
      <p>
        A detailed listing of each anime for each user can be found in the table under the tab 
        'Anime Table'. This gives the specific ratings and is sorted alphabetically, with a preference 
        such that animes that have been watched by all users will appear at the top. It also shows the 
        average difference in user ratings for each anime. 
      </p>

      <h3>Issues, Bugs, Feature Requests</h3>
      <p>The code for this project is completely open source and can be found at:&nbsp;
        <a href='https://github.com/forever-maximus/mal-visualiser'>
          https://github.com/forever-maximus/mal-visualiser
        </a>
      </p>
      <p>You can submit issues on Github or even submit a pull request and I will try to look at it.</p>
    </div>
  );
};

export default About;