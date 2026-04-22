function App() {
  function handleClick() {
    console.log("Button clicked!");
  }
  return (
    <>
      <p>App</p>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default App;
