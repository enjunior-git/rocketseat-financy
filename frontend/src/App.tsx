import { Button } from "./components/ui/button";
import Logo from "./assets/logo.svg";

function App() {
  return (
    <>
      <img src={Logo} alt="Financy logo" />
      <h1 className="text-2xl font-bold">Hello world</h1>{" "}
      <Button variant="outline">Button</Button>
    </>
  );
}

export default App;
