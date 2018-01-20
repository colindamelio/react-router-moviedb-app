import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;

class MovieList extends Component {

  state = {
    movies: [],
  }

  async componentDidMount() {
    try {

      const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=c57c72b7dde4ed7f0182ec929455370a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');

      const movies = await response.json();

      this.setState({
        movies: movies.results,
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movies } = this.state;

    return (
      <MovieGrid>
        {
          movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))
        }
      </MovieGrid>
    );
  }
}

export default MovieList;
