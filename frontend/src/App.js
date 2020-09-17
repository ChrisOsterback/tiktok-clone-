import React, { useEffect, useState } from "react";
import "./css/App.css";

import Video from "./components/Video";
import axios from "./fetch/axios"

function App() {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get('/v2/posts')
      setVideos(response.data)

      return response;
    }

    fetchPosts();
  }, [])



  return (
    <div className="app">
      <div className="app_videos">
        {videos.map(({ url, channel, description, song, likes, shares, messages }) => (
          <Video
            url={url}
            channel={channel}
            song={song}
            likes={likes}
            messages={messages}
            description={description}
            shares={shares}

          />
        ))}

      </div>
    </div>
  );
}

export default App;
