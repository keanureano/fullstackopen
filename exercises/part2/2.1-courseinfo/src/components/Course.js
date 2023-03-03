function Course({ course }) {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
}

function Header({ name }) {
  return <h2>{name}</h2>;
}

function Content({ parts }) {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total parts={parts} />
    </>
  );
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

function Total({ parts }) {
  const total = parts.reduce((total, part) => total + part.exercises, 0);
  return <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>;
}

export default Course;
