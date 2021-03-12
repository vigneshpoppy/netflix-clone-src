import axios from './axios';
import React, { useState ,useEffect} from 'react'
import "./Row.css"
import Youtube  from "react-youtube";
import movieTrailer from 'movie-trailer';
const baseURL="https://image.tmdb.org/t/p/original";

function Row({title,fetchUrl,isLargeRow}) {
     const [Movies, setMovies] = useState([]);
     const [trailerUrl, setTrailerUrl] = useState("");
     useEffect(() => {
        
         async function fetchData(){
           //  console.log(fetchUrl);
            const request = await axios.get(fetchUrl);
            //console.log(request);
            setMovies(request.data.results)

            return request
         }
         fetchData();
         
     }, [fetchUrl]);//insisde od array box i include fetchURl beacause its is outside props so very time that changes thetuy havbe to change snipped
    
     const opts = {
        height: "390",
        width: "99%",
        playerVars: {
          autoplay: 1,
        }
      }
    
      const handleClick = (movie) => {
        // console.table(movie?.title)
        if (trailerUrl) {
          setTrailerUrl('')
        } else {
          movieTrailer(movie?.title || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
      }
    // console.log(Movies);
     return (
        <div className="row">
               <h2>{title}</h2>
            <div className="row_posters">
                    {/* poster image row */}
                    {Movies.map(movie =>(
                        <img key={movie.id} onClick={() => handleClick(movie)} className={`row_poster ${ isLargeRow && "row_posterLarge"}`} src ={`${baseURL}${isLargeRow? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    ) )}
            </div>
            <div style={{ padding: "40px" }}>
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
             </div>
        </div>
    )
}

export default Row

