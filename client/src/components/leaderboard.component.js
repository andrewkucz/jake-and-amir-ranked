import React, { Component } from 'react';
import Axios from 'axios';

export default class Leaderboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          videos: Array(props.top).fill({}),
        };
      }

    componentWillMount() {
        let that = this;
        Axios.get('/api/video/top/' + this.props.top).then(function(res) {
            that.setState({
                videos: res.data
            });
        });
    }

  render() {
        return (
            <div className="row">
                <div className="col-12"><h2>Leaderboards</h2></div>
                <div className="col-12">
                <LeaderboardTable videos={this.state.videos}>
                </LeaderboardTable>
                </div>
            </div>
        )
    }
}



class LeaderboardTable extends React.Component {
    render() {
      return (
        <table className="table leaderboard-table">
        <thead>
          <tr>
              <th>Rank</th>
              <th>Title</th>
              <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {this.props.videos.map((vid, i) =>
            <tr key={i}>
              <td>#{i+1}</td>
              <td> <a href={'https://www.youtube.com/watch?v=' + vid.linkid } target="_blank" rel="noopener noreferrer">{vid.title}</a> </td>
              <td>{vid.rating}</td>
            </tr>
          )}
        </tbody>
        </table>
      );
    }
  }