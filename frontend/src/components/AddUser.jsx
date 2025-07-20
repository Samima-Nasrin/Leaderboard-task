import React, { useState } from 'react';
import API from '../api';

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (!name) return;
    await API.post('/users', { name });
    setName('');
    onUserAdded(); // trigger refresh
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add User</button>
    </div>
  );
}

export default AddUser;