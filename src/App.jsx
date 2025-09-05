import { useState, useEffect } from "react"
import Search from "./components/search"
import Spinner from "./components/spinner"
import MovieCard from "./components/MovieCard"
import { useDebounce } from "react-use"

const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm])

  const fetchMovies = async (query = '') => {
      setErrorMsg("")
      setIsLoading(true)
    try {
      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      
      if(data.Response === "False") {
        setErrorMsg(data.Error) || "An error occurred while fetching data."
        setMovieList([])
        return
      }
      setMovieList(data.results)
    } catch (error) {
      console.error("Error fetching movies:", error)
      setErrorMsg("Failed to fetch movies. Please try again later.")
    } finally {
      setIsLoading(false)
    } 
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <main>
      
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero-img.png " alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You Will Enjoy Without The Hassle</h1>
          <Search 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        </header>

        <section className="all-movies">
            <h2 className="mt-[40px]">All Movies</h2>

            {isLoading ? (
              <div className="flex items-center justify-center h-screen">
                <Spinner />
              </div>
            ) : errorMsg ? (
              <p className="text-red-500 ">{errorMsg}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
        </section>

      </div>
    </main>
  )
}

export default App
