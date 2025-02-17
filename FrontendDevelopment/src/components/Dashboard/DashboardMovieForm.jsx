import React, { useState } from "react";

export default function DashboardMovieForm() {
  const [title, setTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [starName, setStarName] = useState("");
  const [starYear, setStarYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !movieYear || !director || !genre || !starName) {
      setMessage("Please enter required fields.");
      return;
    }

    try {
      const response = await fetch("/fabflix/api/add-movie", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          title: title,
          year: movieYear,
          director: director,
          genre: genre,
          starName: starName,
          starYear: starYear,
        }),
      });

      const data = await response.json();
      setMessage(data.message);
      setTitle("");
      setMovieYear("");
      setDirector("");
      setGenre("");
      setStarName("");
      setStarYear("");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        autoComplete="off"
      >
        <label htmlFor="movieTitle">Movie Title</label>
        <input
          id="movieTitle"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>

        <label htmlFor="movieYear">Year</label>
        <input
          id="movieYear"
          value={movieYear}
          onChange={(event) => {
            setMovieYear(event.target.value);
          }}
        ></input>

        <label htmlFor="director">Director</label>
        <input
          id="director"
          value={director}
          onChange={(event) => {
            setDirector(event.target.value);
          }}
        ></input>

        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          value={genre}
          onChange={(event) => {
            setGenre(event.target.value);
          }}
        ></input>

        <label htmlFor="starName">Star Name</label>
        <input
          id="starName"
          value={starName}
          onChange={(event) => {
            setStarName(event.target.value);
          }}
        ></input>

        <label htmlFor="starYear">Star Birth Year</label>
        <input
          id="starYear"
          value={starYear}
          onChange={(event) => {
            setStarYear(event.target.value);
          }}
        ></input>
        <button type="submit">Add</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
