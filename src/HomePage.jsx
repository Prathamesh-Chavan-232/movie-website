import "./App.css";
import searchIcon from "./search.svg";
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
// OMDB Movie Data API
const API_URL = "https://www.omdbapi.com/?apikey=a87458c7";

export default function OldHomepage() {
  const [Movies, setMovies] = useState([]);
  const [search, setsearch] = useState("");
  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  return (
    <div className="oldHome">
      <h1 className="title">Movie Land...</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>
      {Movies?.length > 0 ? (
        <div className="box">
          {Movies.map((movie) => (
            <MovieCard movie={movie}></MovieCard>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
}
