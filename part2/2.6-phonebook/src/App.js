import { useState, useEffect } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Person from "./components/Person";
import Header from "./components/Header";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.get().then((response) => {
      setPersons(response.data);
    });
  }, []);

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

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...existingPerson, number: newPerson.number };
        personService.change(changedPerson).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === changedPerson.id ? response.data : person
            )
          );
        });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personService.add(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
    });

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Filter values={{ filterName }} handlers={{ filterChange }} />
      <Header text="add a new" />
      <Form
        values={{ newName, newNumber }}
        handlers={{ nameChange, numberChange, addPerson }}
      />
      <Header text="numbers" />
      <ul>
        {filterPersons.map((person) => (
          <Person key={person.id} person={person} handlers={{ deletePerson }} />
        ))}
      </ul>
    </div>
  );
};

export default App;
