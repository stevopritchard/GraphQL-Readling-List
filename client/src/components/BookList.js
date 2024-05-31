import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
  const [selected, setSelected] = useState();
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <ul id="bookList">
        {data.books.map(({ id, name }, index) => {
          return (
            <li
              key={index}
              onClick={(event) => {
                setSelected(id);
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
}

export default BookList;
