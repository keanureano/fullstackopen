import { useState } from "react";

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = (good + bad) / total;
  const positive = (good / total) * 100;

  if (isNaN(average) || isNaN(positive)) {
    return (
      <table>
        <tbody>
          <StatisticLine text="No feedback given" />
        </tbody>
      </table>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
    </table>
  );
}

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function Header({ text }) {
  return <h1>{text}</h1>;
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

export default App;
