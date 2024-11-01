// src/App.js
import React, { useState } from 'react';
import Auth from './components/Auth';
import Contacts from './components/Contacts';

function App() {
    const [user, setUser] = useState(null);

    return (
        <div className="App">
            {!user ? (
                <Auth onLogin={setUser} />
            ) : (
                <Contacts user={user} />
            )}
        </div>
    );
}

export default App;
