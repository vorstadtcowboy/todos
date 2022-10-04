import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  //Den UseState anlegen
  const [todos, setTodos] = useState([]);
  const [aufgabe, setAufgabe] = useState('');
  const [id, setId] = useState(0);

  //Use Effect um die Daten zu holen
  useEffect(() => {
    //Listen Daten von der REST Api holen
    axios.get('http://localhost:3004/todos').then((response) => setTodos(response.data));
  }, [aufgabe, id]);

  //Eine Liste mit React machen
  const todoListe = todos.map((item) => (
    <li key={item.id}>
      {item.todo}{' '}
      <button id={item.id} onClick={handleDelete}>
        löschen
      </button>
    </li>
  ));

  //Delete Fuction
  function handleDelete(event) {
    axios
      .delete(`http://localhost:3004/todos/${event.target.id}`)
      .then(() => setId(event.target.id + 'gelöscht'));
  }

  //Event Handler funktion für das Submit Event
  function handleSubmit(event) {
    event.preventDefault();
    //Schreibe den Wert des Feldes in die Daten.
    axios.post('http://localhost:3004/todos', { todo: aufgabe }).then((response) => {
      //Leert den Wert des Feldes Aufgabe
      setAufgabe('');
      console.log(response);
    });
  }

  return (
    <div className="App">
      <h1>Meine ToDo Liste</h1>
      {/**Formular zum Todo Eintragen */}
      <form onSubmit={handleSubmit}>
        <input
          required={true}
          type="text"
          name="aufgabe"
          value={aufgabe}
          onChange={(event) => setAufgabe(event.target.value)}
        />
        <button type="submit">senden</button>
      </form>

      <ul>{todoListe}</ul>
    </div>
  );
}

export default App;
