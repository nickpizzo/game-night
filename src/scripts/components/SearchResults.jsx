import React from 'react';
import Parse from 'parse';
import Icon from './Icon';
import SearchDetail from './SearchDetail';
import Game from '../Game';

class SearchResults extends React.Component {

  constructor(props) {
    super(props);
    this.query = new Parse.Query(Game);
    this.state = {
      players: this.params('players'),
      duration: this.params('duration'),
      difficulty: this.params('difficulty'),
      games: []
    };
  }

  componentWillMount() {
    this.query
      .find({
        success: (results) => {
          this.setState({
            games: results
          });
        }
      });
  }

  render () {
    let details = this.state
      .games
      .map((game, i) => {
        return <SearchDetail game={game} key={i}/>;
      });

    return (
      <div className="container search-results">
        <div className="results">
          <div className="jumbotron">
            <h2 className="text-center">Search Results</h2>
            <div className="row text-center">
              <div className="col-xs-4">
                <Icon type="users"/>
                <br/>
                {this.state.players}
              </div>
              <div className="col-xs-4">
                <Icon type="hourglass-half"/>
                <br/>
                {this.state.duration}
              </div>
              <div className="col-xs-4">
                <Icon type="cogs"/>
                <br/>
                {this.state.difficulty}
              </div>
            </div>

          </div>
          {details}
        </div>
      </div>
    );
  }

  params(name) {
    console.log(name, location);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

export default SearchResults;
