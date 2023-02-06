const Person = ({ person, handlers }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={() => handlers.deletePerson(person.id, person.name)}>
        delete
      </button>
    </li>
  );
};

export default Person;
