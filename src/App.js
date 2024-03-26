import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
// import Header from './Layout/Header';
import FormState from './Components/UseState/FormState'
import FormList from './Components/UseState/FormList'
import ReducerForm from "./Components/UseReducer/ReducerForm";
import ReducerList from "./Components/UseReducer/ReducerList";
import ContextForm from "./Components/UseContext/API/ContextForm";
import ContextList from "./Components/UseContext/API/ContextList";
import { GlobalProvider } from "./Provider/Provider"
import Home from "./Components/Pages/Home";




 function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={</>} */}
            <Route path="form" element={<FormState />} />
            <Route path="form/:id" element={<FormState />} />
            <Route path="list" element={<FormList />} />
            <Route path="reduform" element={<ReducerForm />} />
            <Route path="reduform/:id" element={<ReducerForm />} />
            <Route path="redulist" element={<ReducerList />} />
            <Route path="conform" element={<ContextForm />} />
            <Route path="conform/:id" element={<ContextForm />} />
            <Route path="conlist" element={<ContextList />} />
            <Route path="" element={<Home />} />
           
            

          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
export default App;