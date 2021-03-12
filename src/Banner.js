import axios from './axios';
import React, { useState ,useEffect} from 'react'
import requests from "./requests";
import "./Banner.css"


function Banner() {
    const [Movies, setMovies] = useState([]);
    useEffect(() => {
       
        async function fetchData(){
          //  console.log(fetchUrl);
           const request = await axios.get(requests.fetchNetflixOriginals);
        //    console.log(request.data.results[
        //     Math.floor(Math.random() * request.data.results.length - 1)
        //     ]);
           setMovies(request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)])

          // return request
        }
        fetchData();
        
    }, []);
    console.log(Movies);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      };
    return (
        <header className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${Movies?.backdrop_path}"
            )`,
            backgroundPosition: "center center"
          }}>

            <div className="banner_contents">
                <h1 className="banner_title">{Movies?.title|| Movies?.name || Movies?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">{truncate(Movies?.overview, 150)}</h1>    
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner
