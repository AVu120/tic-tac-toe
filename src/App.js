import './App.css';

function App() {
  return (
    <div className="App">
      <section>
        {Array.from({length:9}).map(_ => <td/>)}
      </section>
    </div>
  );
}

export default App;
