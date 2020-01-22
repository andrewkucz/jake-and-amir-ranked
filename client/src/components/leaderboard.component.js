import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaderboard(props) {
  
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    axios.get('/api/video/top/' + props.top).then(function(res) {
      setVideos(res.data);
    });

  },[]);

    return (
        <div className="row">
            <div className="col-12">
              <h2>Leaderboards</h2>
            </div>
            <div className="col-12">
              <LeaderboardTable videos={videos} />
            </div>
        </div>
    );
}



function LeaderboardTable(props) {
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
          {props.videos.map((vid, i) =>
            <tr key={i}>
              <td>#{i+1}</td>
              <td><a href={'https://www.youtube.com/watch?v=' + vid.linkid } target="_blank" rel="noopener noreferrer">{vid.title}</a> </td>
              <td>{vid.rating}</td>
            </tr>
          )}
        </tbody>
        </table>
      );
}