import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

export default function Voting() {

    const [video1, setVideo1] = useState({});
    const [video2, setVideo2] = useState({});

    //randomly updates index of video1 and 2
    const updateVideoOptions = () => {

      // NUM VIDEOS = 678 (should never change)
      const len = 678;

      //generates 2 nums from 1 to len
      let i1 = Math.floor(Math.random() * len+1);
      let i2 = Math.floor(Math.random() * len+1);
      while(i1 === i2)
      {
        i2 = Math.floor(Math.random() * len+1);
      }

      axios.get(`/api/video/2vids?index1=${i1}&index2=${i2}`).then(res => 
      {
        console.log(res);
        let vids = res.data;
        if(vids.length === 2)
        {
          setVideo1(vids[0]);
          setVideo2(vids[1]);
        }
      });


    }

    const submitVote = (winner, loser) => {

    let Rwinner = Math.pow(10,(winner.rating/400));
    let Rloser = Math.pow(10,(loser.rating/400));
    let Ewinner = Rwinner/(Rwinner+Rloser);
    let Eloser = Rloser/(Rwinner+Rloser);
    let Swinner = 1;
    let Sloser = 0;
    let k = 32;

    let winnerNewRating = Math.round(winner.rating + (k*(Swinner-Ewinner)));
    let loserNewRating = Math.round(loser.rating + (k*(Sloser-Eloser)));

    let videos = [winner, loser];
    videos[0].rating = winnerNewRating;
    videos[1].rating = loserNewRating;

    //put videos with new ELO rating
    axios.post('/api/video/update/2vids',{videos: videos}).then(function(res) {
      console.log(res);
      updateVideoOptions();
    });

    };

    useEffect(() => {
      updateVideoOptions();
    }, []);

    return (
      <div className="container main-body">
      <div className="row">
        <div className="col-md-6">
          <VideoBox video={video1} onVote={() => submitVote(video1, video2)}/>
        </div>
        <div className="col-md-6">
          <VideoBox video={video2} onVote={() => submitVote(video2, video1)}/>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Explanation />
        </div>
      </div>
      
      </div>
      
    );
}

  
function VideoBox(props) {    
  return (
        <>
        <Video video={props.video} />
        <Button className="vote-button" variant="primary" size="lg" onClick={() => props.onVote()} block>
            Vote
        </Button>
        </>
  );
}
  
function Video(props) {
  return (
    <div className="embed-responsive  embed-responsive-16by9">
      <iframe className="embed-responsive-item" title={props.video.title} src={'https://www.youtube.com/embed/' + props.video.linkid } frameBorder="0" allowFullScreen></iframe>
    </div>
  );
}

function Explanation() {
  return (
    <div className="container explanation">
          <h3>What/Why</h3>
          <p>
            <strong>Jake & Amir Ranked</strong> is a simple web application with the goal of using the wisdom of the crowds to determine the indisputable best Jake and Amir episode.
          </p>
          <p>
            Based on the <a href="https://en.wikipedia.org/wiki/Elo_rating_system">ELO Rating System</a> this app works by pitting 2 random episodes in a head to head vote and adjusting their ratings based on the outcome, according to a specific formula. Over time and with a LOT of user votes, an epsiodes ELO rating will be a great indicator of it's ranking in the population of videos. The more votes, the more accurate the Leaderboard, so get voting!
          </p>
          <p>
            This project was my first React project and was meant to be a fun learning experience more than anything.  
          </p>
          <h3>How to play</h3>
          <p>
            Vote for which video you think is better using the buttons below them. You can watch the videos if you want a refresher or just speed vote to improve the accuracy of the leaderboard.
            <br />
            NOTE: Every vote impacts both video's ELO rating, even if it doesn't look like the leaderboards are affected
          </p>
    </div>
  );
}