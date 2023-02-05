function App() {
  const name = "Keanu";
  const now = new Date();
  const x = 10;
  const y = 20;

  return (
    <div>
      <Hello name={name} />
      <TimeNow time={now} />
      <Adder x={x} y={y} />
    </div>
  );
}

function Hello(props) {
  console.log(props);
  return <p>Hello {props.name}</p>;
}

function TimeNow(props) {
  console.log(props);
  return <p>It is now {props.time.toString()}</p>;
}

function Adder(props) {
  console.log(props);
  return (
    <p>
      {props.x} + {props.y} = {props.x + props.y}
    </p>
  );
}

export default App;
