import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: #fff;
  text-align: left;
  padding: 2rem 10%;
  display: flex;

  > div {
    margin-left: 20px;
  }

  img {
    position: relative;
    top: -5rem;
  }
`;

class MovieDetail extends Component {

  state = {
    movie: {},
  }

  async componentDidMount() {
    try {

      const response = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieID}?api_key=c57c72b7dde4ed7f0182ec929455370a&language=en-US`);

      const movie = await response.json();

      this.setState({
        movie,
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movie } = this.state;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;
