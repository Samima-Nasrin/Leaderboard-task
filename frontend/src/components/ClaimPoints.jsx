import React, { useState } from 'react';
import API from '../api';
import confetti from 'canvas-confetti'; // 👈 Add this line

function ClaimPoints({ selectedUser, onClaim }) {
  const [lastPoints, setLastPoints] = useState(null);

  const handleClaim = async () => {
    if (!selectedUser) return;

    try {
      const res = await API.post('/claim', { userId: selectedUser });
      setLastPoints(res.data.pointsAwarded);
      onClaim(); // refresh leaderboard

      // 🎉 Trigger confetti
      confetti({
        particleCount: 220,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f491b3', '#b2ebf2', '#fff9c4', '#c1afe1'],
      });

    } catch (error) {
      console.error('Claim error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClaim} disabled={!selectedUser}>
        Claim Points
      </button>
      {lastPoints !== null && <p>Claimed: +{lastPoints} points</p>}
    </div>
  );
}

export default ClaimPoints;
