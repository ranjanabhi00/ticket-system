import { BrowserRouter } from "react-router-dom";
import Routers from "./routers/routes";

function App() {
  return (
    <div>
        <BrowserRouter>
        <Routers/>
        </BrowserRouter>
    </div>
  );
}

export default App;
