import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, getMovieListbyQuery } from './api';

function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setMovieList(result);
      console.log(result);
    });
  }, []);

  const MovieList = () => {
    if (movieList.length === 0) {
      getMovieList().then((result) => {
        setMovieList(result);
      })
    }

    return movieList.map((movie, i) => {
      return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 border border-gray-700" key={i}>
          <div className="px-6 py-4">
            <div className="font-bold text-white text-xl mb-2">{movie.title}</div>
            <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
            <div className="text-white text-xl mb-2">{movie.release_date}</div>
            <div className="text-white text-xl mb-2">{movie.vote_average}</div>
          </div>
        </div>
      );
    });
  };

  async function search(q) {
    if (q.length >= 3) {
      const query = await getMovieListbyQuery(q);
      setMovieList(query);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex items-center justify-center h-16">
        <label htmlFor="default-search" className="sr-only text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-white border border-gray-700 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Movie Name..."
            onChange={({ target }) => search(target.value)}
          />
        </div>
      </div>
      <div className="flex content-center justify-center">
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          <MovieList />
        </div>
      </div>
    </div>
  );
}

export default App;
