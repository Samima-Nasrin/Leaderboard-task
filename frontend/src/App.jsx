import React, { useEffect, useState } from 'react';
import API from './api';
import UserSelect from './components/UserSelect';
import AddUser from './components/AddUser';
import ClaimPoints from './components/ClaimPoints';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const fetchUsers = async () => {
    const res = await API.get('/users');
    setUsers(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await API.get('/leaderboard');
    setLeaderboard(res.data);
  };

  const refreshAll = () => {
    fetchUsers();
    fetchLeaderboard();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <div className="app-container">
      <h1>🎀 Lucky Draw Picker 🎀</h1>

      <UserSelect users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <br />

      <ClaimPoints selectedUser={selectedUser} onClaim={refreshAll} />
      <br />

      <AddUser onUserAdded={refreshAll} />
      <br />

      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default App;