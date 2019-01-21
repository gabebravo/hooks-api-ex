import React, { useState, useEffect } from 'react'

export default function AppAsyncAwait() {
  const [result, setResults] = useState([])
  const [query, setQuery] = useState('reacthooks')
  const [searchTerm, setSearchTerm] = useState('')

// useEffect will run getData with inital query on-mount and fire again anytime the query value changes
// this is because the array arguement is tracking query
  useEffect(() => {
    getData(query); // calls async/await api fetch with the query term
    return () => setSearchTerm('') // resets searchTerm after each search click event (cleanup)
  }, [query]) // updates query on each state change of query, which happens on each search click event

// Hooks example with api fetch on componentDidMount using native fetch api 
  async function getData(){ // this will fetch from the api on cdm with reacthooks, and then the searchTerm every time after
    const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
    .then( res => res.json())
    .then( data => data.hits)
    setResults(response);
  }

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
    <>
    <input value={searchTerm} onChange={event => setSearchTerm(event.target.value)} />
    <button onClick={() => setQuery(searchTerm)}>Search</button>
    <ul>
      { result && renderArticles(result) }
    </ul>
    </>
  )
}
