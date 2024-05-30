import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK } from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');

  const { loading, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const displayAuthors = () => {
    if (loading) return <option disabled>Loading...</option>;

    return data.authors.map(({ id, name }, index) => {
      return (
        <option key={index} value={id}>
          {name}
        </option>
      );
    });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(name, genre, author);
    addBook({ variables: { name: name, genre: genre, authorId: author } });
  };

  return (
    <form id="add-book" onSubmit={submitForm.bind(this)}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(event) => setGenre(event.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(event) => setAuthor(event.target.value)}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
