// Check if user is logged in as member
if (localStorage.getItem('userRole') !== 'member') {
    window.location.href = 'index.html';
}

function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// Load the saved ranking from localStorage and display it
const savedRanking = JSON.parse(localStorage.getItem('ranking'));
const rankingList = document.getElementById('rankingList');

if (savedRanking && savedRanking.length > 0) {
    savedRanking.forEach((member, index) => {
        const li = document.createElement('li');
        li.textContent = `Rank ${index + 1}: ${member.name} (Total Score: ${member.totalScore.toFixed(2)})`;
        rankingList.appendChild(li);
    });
} else {
    rankingList.innerHTML = '<li>No ranking data available. Please contact the admin.</li>';
}
