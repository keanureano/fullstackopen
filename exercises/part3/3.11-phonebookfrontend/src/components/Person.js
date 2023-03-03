const Person = ({ person, handlers }) => {
  return (
    <li data-id={person.id}>
      {person.name} {person.number}
      <button onClick={() => handlers.deletePerson(person.id, person.name)}>
        delete
      </button>
    </li>
  );
};

export default Person;
