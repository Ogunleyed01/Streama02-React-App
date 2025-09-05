import React from 'react'

const MovieCard = ({ movie : {title, poster_path, vote_average, release_date, original_language } }) => {
    return (
        <div className='movie-card'>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} onError={(e) => { e.target.src = '/No-PosterPortrait.png'; }} />

            <div className='text-white mt-4'>{title}</div>
            <div className='content'>
                <div className='rating'>
                    <img src="/star.svg" alt="Rating" />
                    <p>{vote_average  ? vote_average.toFixed(1) : "N/A"}</p>

                    <span>•</span>
                    <p className='language'>{original_language}</p>

                    <span>•</span>
                    <p className='year'>
                        {release_date ? release_date.split("-")[0] : "N/A"}
                    </p>
                </div>
            </div>
        </div>
        
    )
}

export default MovieCard