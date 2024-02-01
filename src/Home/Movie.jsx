import React, { useEffect } from 'react'

const Movie = () => {

    const apiKey = process.env.REACT_APP_MOVIES_API_KEY;

    const getMovieApi = async () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
            .then(res => res.json())
            .then(json => console.log(json.results))
    }

    useEffect(() => {
        getMovieApi();  
    }, [])

    return (
        <div>
            <h1>hello</h1>
        </div>
    )
}

export default Movie