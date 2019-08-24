import React from 'react'
import Link from 'next/link'

const Nav = ({ episodes = [] }) => (
  <nav>
    <ul>
      {!episodes.length && (
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      )}
      {episodes &&
        episodes.map(episode => {
          return (
            <li key={episode.id}>
              <Link href="/episode/[id]" as={`/episode/${episode.id}`}>
                <a>{episode.name}</a>
              </Link>
            </li>
          );
        })}
    </ul>
    <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: center;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #fac134;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
      }
    `}</style>
  </nav>
);

export default Nav
