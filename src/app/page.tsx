'use client'
import { useState, useEffect } from "react";

interface MovieData {
  Title: string;
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Array<{ Source: string; Value: string; }>;
  Released: string;
  Runtime: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export default function Home() {
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovieData(): Promise<MovieData> {
    const response = await fetch('http://www.omdbapi.com/?i=tt3896198&apikey=9799e6a9');
    const movieInfo = await response.json();
    return movieInfo;
  }

  const fetchMovie = async () => {
    setIsLoading(true);
    try {
      const movieInfo = await fetchMovieData();
      setMovie(movieInfo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <button 
          onClick={fetchMovie}
          disabled={isLoading}
          className="group relative mb-12 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-all duration-300 transform hover:scale-105 disabled:opacity-50 
                     disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center 
                     space-x-2 shadow-lg hover:shadow-blue-500/50"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16m10-16v16M3 8h18M3 16h18"/>
              </svg>
              <span>Fetch Movie Details</span>
            </>
          )}
        </button>

        {movie && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 transition-all duration-500 
                        hover:shadow-blue-500/20 hover:scale-[1.01]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative group">
                <img src={movie.Poster} alt={movie.Title} 
                     className="rounded-lg shadow-xl w-full transition duration-300 
                              group-hover:shadow-2xl group-hover:shadow-blue-500/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                              rounded-lg flex items-end">
                  <div className="p-4 text-white">
                    <div className="font-bold">{movie.Year}</div>
                    <div className="text-sm">{movie.Runtime}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold text-white/90">{movie.Title}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{movie.Plot}</p>
                
                <div className="grid grid-cols-2 gap-6">
                  <InfoItem label="Year" value={movie.Year} />
                  <InfoItem label="Rated" value={movie.Rated} />
                  <InfoItem label="Runtime" value={movie.Runtime} />
                  <InfoItem label="Genre" value={movie.Genre} />
                  <InfoItem label="Director" value={movie.Writer} />
                  <InfoItem label="Actors" value={movie.Actors} />
                  <InfoItem label="Box Office" value={movie.BoxOffice} />
                  <InfoItem label="IMDb Rating" value={movie.imdbRating} />
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-4 text-white/90">Ratings</h2>
                  <div className="space-y-3">
                    {movie.Ratings?.map((rating, index) => (
                      <div key={index} className="flex justify-between items-center 
                                                bg-white/5 p-3 rounded-lg hover:bg-white/10 
                                                transition-colors duration-200">
                        <span className="text-gray-300">{rating.Source}</span>
                        <span className="font-medium text-blue-400">{rating.Value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200">
      <span className="font-semibold text-blue-400">{label}: </span>
      <span className="text-gray-300">{value}</span>
    </div>
  );
}