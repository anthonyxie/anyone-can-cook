import React, { useState, useEffect } from 'react';
import ENV from '../config.env';

function VideoCaller({imageUrl, audioUrl}) {
   
    const [videoUrl, setVideoUrl] = useState(null);
    const [resp, setResponse] = useState(null);
    const [response2, setResponse2] = useState(null);

    useEffect(() => {
        if (imageUrl && audioUrl) {
            const options = {
                method: 'POST',
                headers: {accept: 'application/json', 'content-type': 'application/json', authorization: `Basic ${ENV.DID_API_KEY}`},
                body: JSON.stringify({
                  script: {
                    type: 'audio',
                    provider: {type: 'microsoft', voice_id: 'Jenny'},
                    ssml: 'false',
                    audio_url: `${audioUrl}`
                  },
                  config: {fluent: 'false', pad_audio: '0.0'},
                  source_url: `${imageUrl}`
                })
              };
              
            fetch('https://api.d-id.com/talks', options)
                .then(response => response.json())
                .then(response => {
                  console.log(response)
                  setResponse(response);
                  })
                .catch(err => console.error(err));
        }
    }, [imageUrl, audioUrl]);


    useEffect(() => {
      if (resp) {
        if (resp.status == 'created') {
          let id = resp.id;
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              authorization: `Basic ${ENV.DID_API_KEY}`
            }
          };

          var joe = setInterval(function() {
            fetch(`https://api.d-id.com/talks/${id}`, options)
            .then(response => response.json())
            .then(response => {
              console.log(response);
              if (response.status == 'done') {
                setVideoUrl(response.result_url);
                clearInterval(joe);
              }
              if (response.status == 'error') {
                clearInterval(joe);
              }
            })
            .catch(err => console.error(err));
          }, 10000);
        }
      }
    }, [resp]);

    if (resp && videoUrl) {
        return (
          <div>
          <video src={videoUrl} />
          <p color="black">Download link: {videoUrl}</p>
          </div>

        );
      } else if (audioUrl && imageUrl) {
        return (
        <div>Loading...</div>
        );
      }
      else {
        return null;
      }
}

export default VideoCaller;