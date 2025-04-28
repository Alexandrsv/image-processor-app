import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className={"bg-red-500 flex justify-center"}>Привет!</div>
      <Button>Click me</Button>
      <Input />
    </>
  );
}

export default App;
