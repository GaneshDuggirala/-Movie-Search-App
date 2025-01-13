

const apikey = "257603d0"; // Your OMDB API key

let button = document.getElementById("search-btn");
let moviedisplayed = document.getElementById("movie-details");

button.addEventListener("click", async () => {
  const moviename = document.getElementById("movie-input").value.trim();

  if (moviename === "") {
    alert("Please enter a movie name.");
    return;
  }

  // Function to fetch movie details
  const fetchmoviedetails = async () => {
    const apiurl = `https://www.omdbapi.com/?t=${encodeURIComponent(
      moviename
    )}&apikey=${apikey}`;
    try {
      const response = await fetch(apiurl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // Fetch the movie data
  let filmdata = await fetchmoviedetails();

  // Clear previous movie details
  moviedisplayed.innerHTML = "";

  // Check if movie data was retrieved successfully
  if (filmdata && filmdata.Response === "True") {
    // Display the poster if available
    if (filmdata.Poster !== "N/A" && typeof filmdata.Poster !== "undefined") {
      let filmposter = filmdata.Poster;
      const imgElement = document.createElement("img");
      imgElement.src = filmposter;
      imgElement.alt = filmdata.Title;
      imgElement.style.width = "250px";
      imgElement.style.height = "250px";
      moviedisplayed.appendChild(imgElement); // Append poster to movie details container
      moviedisplayed.style.display = "flex";
      moviedisplayed.style.flexDirection = "column";
      moviedisplayed.style.alignItems = "center";
      moviedisplayed.style.justifyContent = "center";
    }

    // Display movie details below the poster
    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("movie-info");

    detailsContainer.innerHTML = `
      <h2>${filmdata.Title}</h2>
      <p><strong>Genre : </strong> ${filmdata.Genre}</p>
      <p><strong>Director : </strong> ${filmdata.Director}</p>
      <p><strong>Starring : </strong> ${filmdata.Actors}</p>
      <p><strong>Writer : </strong> ${filmdata.Writer}</p>
      <p><strong>IMDB Rating : </strong> ${filmdata.imdbRating}</p>
      <p><strong>Box Office : </strong> ${filmdata.BoxOffice}</p>
    `;

    moviedisplayed.appendChild(detailsContainer); // Append movie details to the container
  } else {
    // If movie not found, show an error message
    moviedisplayed.innerHTML = "<p>Movie not found. Please try again.</p>";
  }
});
