import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <ul id="bookList">
        {data.books.map(({ name, genre }, index) => {
          return (
            <li key={index}>
              {name}, {genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
