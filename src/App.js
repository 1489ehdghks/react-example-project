import React from 'react';
import DetailPage from './pages/DetailPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import Listpage from './pages/ListPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Listpage />}></Route>
          <Route path="/view/:id/:id2" element={<DetailPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;