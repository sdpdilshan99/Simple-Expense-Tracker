import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navigation from "./components/Navigation";
import HomePage from "./components/Homepage";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import ManageTags from "./components/ManageTags";
import { ToastContainer } from "react-toastify";

function App() {
  const [menu,setMenu] = useState(false);
  const [showTags, setShowTags] = useState(false);

  return (
    <Router> 
      <div className="flex">
        <Navigation menu={menu} setMenu={setMenu} setShowTags={setShowTags} showTags={showTags}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage menu={menu}/>} />
            <Route path="/add" element={<AddTransactionForm menu={menu}/>} />
            <Route path="/transactions" element={<TransactionList menu={menu}/>} />
          </Routes>

          {showTags && (
            <>
              <div className="fixed inset-0 bg-black/50 z-40 " onClick={() => setShowTags(false)} />
              <div className="fixed right-0 top-0 z-50 ">
                <ManageTags />
              </div>
            </>
          )}

          <ToastContainer position="top-right" autoClose={3000}/>
        </div>
      </div>
    </Router>
  )
}

export default App
