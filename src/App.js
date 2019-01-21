import React, { useState, useEffect } from 'react'

export default function App() {
  const [result, setResults] = useState([])

// Hooks example with api fetch on componentDidMount using native fetch api 
  useEffect( () => {
    fetch('http://hn.algolia.com/api/v1/search?query=reacthooks')
    .then( res => res.json() ) // this returns the promise from the call
    .then( data => { // this is the block where it gets parsed/used
      console.log('data', data.hits);
      setResults(data.hits);
    });
  }, []) // The empty array is neccesary for the api setter to only run once on-mount, 
        // otherwise, you get an infinite loop

  function renderArticles(articles){
    return articles.map( article => {
      const { objectID, url, title, author } = article;
      return (
        <li key={objectID}>
          <p><a href={url}>{title}</a> by {author || 'NA'}</p>
        </li>
      )
    })
  }

  return (
    <ul>
      { result && renderArticles(result) }
    </ul>
  )
}
