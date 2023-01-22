import { useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Person from "./components/Person";
import Header from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const filterPersons =
    filterName.trim() === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        );
  const filterChange = (event) => {
    setFilterName(event.target.value);
  };

  const nameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const formSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (
      !persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newPerson.name} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Filter values={{ filterName }} handlers={{ filterChange }} />
      <Header text="add a new" />
      <Form
        values={{ newName, newNumber }}
        handlers={{ nameChange, numberChange, formSubmit }}
      />
      <Header text="numbers" />
      <ul>
        {filterPersons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
