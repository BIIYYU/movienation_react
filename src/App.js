import "./App.css";
import { getMovieList, searchMovie} from "./api"
import { useEffect, useState } from "react";
import Navbar from './utils/navbar';

const App = () => {
    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        getMovieList().then((result) => {
            setPopularMovies(result)
        })
    }, [])

    const PopularMovieList = () => {
        return popularMovies.map((movie, i) => {
            return(
                <div 
                    className="Movie-wrapper" 
                    key={i}
                    onClick={({target}) => desc(target.value)}
                    > 
                    <div className="Movie-title">{movie.title}</div>
                    <img className="Movie-img" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
                    <div className="Movie-date">Release : {movie.release_date}</div>
                    <div className="Movie-rate">{movie.vote_average} ★</div>
                </div>
            )
        })
    }

    const desc = () => {
        return popularMovies.map((movie,i) => {
            let key   = {i}
            let judul = `${movie.original_title}`;
            console.log(judul);
        })
    }


    const search = async(q) =>{
        // console.log({q});
        if(q.length > 3 ){
            const query = await searchMovie(q)
            setPopularMovies(query.results)
            // console.log(query)
        }
    }

    // console.log({popularMovies: popularMovies});

  return (
    <div className="App">
      <header className="App-header">
        <img  className="Logo-header"
            src={require("./assets/movie_nation.png")} 
            style={{ width:500, height:500 }}
        />
        <Navbar/>

        
            <input 
                placeholder="Cari Film" 
                className="Movie-search" 
                onChange={({target}) => search(target.value)}
            />
        <div className="Movie-container">
            <PopularMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;
