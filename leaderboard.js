document.addEventListener('DOMContentLoaded', () => {
    displayLeaderboard();
    attachResetEvent();
});

function displayLeaderboard() {
    checkMonthlyReset();
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardTableBody = document.getElementById('leaderboard');
    leaderboardTableBody.innerHTML = '';

    leaderboardData.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.points}</td>
        `;
        leaderboardTableBody.appendChild(row);
    });
}

function resetLeaderboard() {
    localStorage.removeItem('leaderboard');
    displayLeaderboard();
}

function attachResetEvent() {
    const resetButton = document.getElementById('resetLeaderboard');
    if (resetButton) {
        resetButton.addEventListener('click', resetLeaderboard);
    }
}

function checkMonthlyReset() {
    const lastResetDate = new Date(localStorage.getItem('lastResetDate') || 0);
    const currentDate = new Date();
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // Approximate month duration in milliseconds

    if (currentDate - lastResetDate > oneMonth) {
        resetLeaderboard();
        localStorage.setItem('lastResetDate', currentDate.toISOString());
    }
}