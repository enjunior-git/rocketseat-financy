import Logo from "./assets/logo.svg";
import { LabelButton } from "./components/ui/label-button";

function App() {
  return (
    <>
      <img src={Logo} alt="Financy logo" />
      <h1 className="text-2xl font-bold">Hello world</h1>
      <LabelButton variant="outline">Button</LabelButton>
    </>
  );
}

export default App;
