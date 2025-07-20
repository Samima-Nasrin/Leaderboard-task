import React from 'react';

function UserSelect({ users, selectedUser, setSelectedUser }) {
  return (
    <div>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
}

export default UserSelect;