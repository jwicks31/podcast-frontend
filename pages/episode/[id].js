import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Nav from '../../src/components/Nav';
import { Player } from '../../src/features/Player';

const Episode = () => {
  const [episode, setEpisode] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchEpisode = async () => {
      const result = await axios(`http://localhost:1337/episodes/${id}`);
      setEpisode(result.data);
    };
    if (!!id) fetchEpisode();
  }, [id]);

  return (
    <div className="container">
      <Nav />
      {episode && (
        <Player
          audio={episode.audio}
          name={episode.name}
          markers={episode.markers}
        />
      )}
      <style jsx>{`
        :global(body) {
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
          background-color: #0f1113;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Episode;
