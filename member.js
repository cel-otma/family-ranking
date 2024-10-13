// Check if user is logged in as member
if (localStorage.getItem("userRole") !== "member") {
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}

// Load the saved ranking from localStorage and display it
// const savedRanking = JSON.parse(localStorage.getItem('ranking'));
// const rankingList = document.getElementById('rankingList');

// if (savedRanking && savedRanking.length > 0) {
//     savedRanking.forEach((member, index) => {
//         const li = document.createElement('li');
//         li.textContent = `Rank ${index + 1}: ${member.name} (Total Score: ${member.totalScore.toFixed(2)})`;
//         rankingList.appendChild(li);
//     });
// } else {
//     rankingList.innerHTML = '<li>No ranking data available. Please contact the admin.</li>';
// }

function getRanking() {
  database
    .ref("rankings")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        members = data;
        // Clear existing table
        document.getElementById("memberTableBody").innerHTML = "";
        // Add members to table
        members.forEach(addMemberToTable);
        // Display ranking
        calculateRanking();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error getting ranking: ", error);
    });
}

function displayRanking() {
  database
    .ref("rankings")
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        const rankingList = document.getElementById("rankingList");
        rankingList.innerHTML = "";
        data.forEach((member, index) => {
          const li = document.createElement("li");
          li.textContent = `Rank ${index + 1}: ${
            member.name
          } (Total Score: ${member.totalScore.toFixed(2)})`;
          rankingList.appendChild(li);
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error getting ranking: ", error);
    });
}
