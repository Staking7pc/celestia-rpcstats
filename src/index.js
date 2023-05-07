import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Individual from "./components/Individual";
import RpcStatus from "./components/RpcStatus";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Router>
    <React.Fragment>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/validator/:valoper" element={<Individual/>} />
        <Route path="/rpc-status" element={<RpcStatus/>} />
      </Routes>
    </React.Fragment>
  </Router>

);

// ReactDOM.render(
//   <Router>
//     <React.Fragment>
//       <App />
//       <Routes>
//         <Route path="/" element={<App/>} />
//         <Route path="/validator/:valoper" element={<Individual/>} />
//       </Routes>
//     </React.Fragment>
//   </Router>,
//   document.getElementById("root")
// );
