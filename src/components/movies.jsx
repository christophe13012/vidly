import React from "react";
import Like from "./like";

const Movies = ({ movies, onDelete, onLike, itemPerPage, activePage }) => {
  const paginatedMovies = movies.slice(
    (activePage - 1) * itemPerPage,
    itemPerPage + (activePage - 1) * itemPerPage
  );
  return (
    <div className="col-9">
      <header style={styles.header}>
        {movies.length === 0
          ? "Aucun film présent dans la base de donnée"
          : `Voici ${movies.length} films présents dans la base de donnée`}
      </header>
      {movies.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Note</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map(movie => {
              return (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      like={movie.isLiked}
                      onClick={() => onLike(movie._id)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onDelete(movie._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  header: {
    marginBottom: 20,
    fontWeight: "500"
  }
};

export default Movies;
