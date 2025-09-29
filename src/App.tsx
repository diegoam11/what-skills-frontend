import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter></AppRouter>
    </BrowserRouter>
  );
}

export default App;
