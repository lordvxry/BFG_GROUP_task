import React from 'react';
import "./app.css"
import MainPage from "./MainPage/MainPage";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const App = () => {
    return (
        <div className="app-container">
            <Header/>
            <MainPage/>
            <Footer/>
        </div>
    );
};

export default App;