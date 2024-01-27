import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "antd";

import HomePage from "./pages/HomePage";


const {Content, Header, Footer} = Layout


const App = () => {
	return (
		<div className="App">
      <Router>
        <Header/>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage/>} />
          </Routes>
          <ToastContainer theme='dark'/>
        </main>
        <Footer/>
      </Router>
    </div>
	);
};

export default App;