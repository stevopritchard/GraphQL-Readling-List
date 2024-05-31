import { useQuery } from '@apollo/client';
import { GET_BOOK } from '../queries/queries';

function BookDetails({ bookId }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  const displayBookDetails = () => {
    if (data !== undefined) {
      if (data.book !== null) {
        const { book } = data;
        return (
          <div>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>All books by this author:</p>
            <ul className="allBooks">
              {book.author.books.map((book, index) => {
                return <li key={index}>{book.name}</li>;
              })}
            </ul>
          </div>
        );
      }
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  };

  return <div id="bookDetails">{displayBookDetails()}</div>;
}

export default BookDetails;
