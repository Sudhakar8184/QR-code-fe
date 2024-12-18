import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Member from './components/Members';
import MemberDetails from './components/MemberDetails';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Login from './components/Login';

const App = () => {
    return (
        <Router>
          <Navbar/>
            <div className="content main-content">
                <Routes>
                    {/* Route for the member list */}
                    <Route path="/" element={<Login/> } />
                    <Route path="/members" element={<Member />} />
                    <Route path="/member/:id" element={<MemberDetails />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
