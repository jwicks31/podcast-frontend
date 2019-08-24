import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../src/components/Nav'
import { Player } from '../src/features/Player';
import axios from 'axios';

const Home = () => {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    const fetchEpisodes = async () => {
      const result = await axios(
        'http://localhost:1337/episodes',
      );
      setEpisodes(result.data);
    };
    fetchEpisodes();
  }, []);

  return (
    <div>
      <Head>
        <title>Acast Player</title>
      </Head>
      <Nav episodes={episodes} />
      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
          background-color: #0f1113;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Home
