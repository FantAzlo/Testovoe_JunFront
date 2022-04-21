import PersonCard from "./Components/PersonCard";

function App() {
  return (
    <div className="App">
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>
      <PersonCard></PersonCard>

      <button className={"addButton"}> + add new person </button>
    </div>
  );
}

export default App;
