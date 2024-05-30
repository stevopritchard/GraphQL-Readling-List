import { gql, useQuery } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
      author {
        name
        age
      }
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  console.log(data);
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
