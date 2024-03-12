import UiBackground from "./components/background";
import UiInteractive from "./components/interactive";
import Style from "./assets/styles/app.module.scss";

function App() {
  return (
    <div className={Style.wrapper}>
      <UiBackground />
      <UiInteractive />
    </div>
  );
}

export default App;
