import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./core/Index";
// import About from "./views/pages/About";
// import Contact from "./views/pages/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Pages */}
          {/* <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
