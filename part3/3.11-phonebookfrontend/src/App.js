import { useState, useEffect } from "react";
import "./index.css";
import Form from "./components/Form";
import Filter from "./components/Filter";
import Person from "./components/Person";
import Header from "./components/Header";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);

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
              person.id === response.data.id ? response.data : person
            )
          );
          notify("success", `Changed ${changedPerson.name}'s number`);
        });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    personService.add(newPerson).then((response) => {
      console.log(response);
      setPersons(persons.concat(response.data));
      notify("success", `Added ${newPerson.name}`);
    });

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .catch(() => {
          notify(
            "error",
            `Information of ${name} has already been removed from server`
          );
        })
        .finally(() => {
          notify("success", `Deleted ${name}`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const notify = (type, text) => {
    setNotification({
      type: type,
      text: text,
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div>
      <Header text="Phonebook" />
      <Notification notification={notification} />
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
