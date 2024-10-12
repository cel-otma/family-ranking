// Check if user is logged in as admin
if (localStorage.getItem('userRole') !== 'admin') {
    window.location.href = 'index.html';
}

function logout() {
    localStorage.removeItem('userRole');
    window.location.href = 'index.html';
}

// Array to store member data
let members = [];

// Function to add a member to the table
function addMemberToTable(member) {
    const tableBody = document.getElementById('memberTableBody');
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.contribution}</td>
        <td>${member.engagement}</td>
        <td>${member.performance}</td>
        <td>${member.reputation}</td>
        <td>${member.comportement}</td>
    `;
}

// Function to import Excel file

function importCSV() {
    const file = document.getElementById('csvFile').files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        members = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue; // Skip empty lines
            const values = lines[i].split(',');
            const member = {
                name: values[0],
                contribution: parseFloat(values[1]),
                engagement: parseFloat(values[2]),
                performance: parseFloat(values[3]),
                reputation: parseFloat(values[4]),
                comportement: parseFloat(values[5])

            };
            members.push(member);
        }

        // Clear existing table
        document.getElementById('memberTableBody').innerHTML = '';

        // Add imported members to table
        members.forEach(addMemberToTable);
    };
    reader.readAsText(file);
}


// Event listener for adding a single member
document.getElementById('addMemberForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newMember = {
        name: document.getElementById('memberName').value,
        contribution: parseFloat(document.getElementById('contribution').value),
        engagement: parseFloat(document.getElementById('engagement').value),
        performance: parseFloat(document.getElementById('performance').value),
        reputation: parseFloat(document.getElementById('reputation').value),
        comportement: parseFloat(document.getElementById('comportement').value)

    };
    members.push(newMember);
    addMemberToTable(newMember);
    this.reset(); // Reset the form
});

function calculateRanking() {
    // Weights for the factors
    const weights = {
        contribution: 0.4,
        engagement: 0.15,
        performance: 0.15,
        reputation: 0.2,
        comportement: 0.1
    };

    // Calculate total score for each member
    members.forEach(member => {
        member.totalScore = 
            (member.contribution * weights.contribution) +
            (member.engagement * weights.engagement) +
            (member.performance * weights.performance) +
            (member.reputation * weights.reputation) + 
            (member.comportement * weights.comportement);
    });

    // Sort members by total score in descending order
    members.sort((a, b) => b.totalScore - a.totalScore);

    // Display the ranking result
    let rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = ''; // Clear previous results
    members.forEach((member, index) => {
        let li = document.createElement('li');
        li.textContent = `Rank ${index + 1}: ${member.name} (Total Score: ${member.totalScore.toFixed(2)})`;
        rankingList.appendChild(li);
    });
}

function saveRanking() {
    localStorage.setItem('ranking', JSON.stringify(members));
    alert('Ranking has been saved for members to view.');
}

function exportToExcel() {
    console.log("Début de l'exportation vers Excel");
    try {
        // Vérifier si XLSX est défini
        if (typeof XLSX === 'undefined') {
            throw new Error("La bibliothèque XLSX n'est pas chargée");
        }

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Create a worksheet
        const ws_data = [
            ["Member Information"],
            [],  // Empty row for spacing
            ["الأعضاء", "اجتماعات عموم أعضاء (40%)", "اجتماعات اللجان (15%)", "تحضير أنشطة (15%)", "تنزيل نشاط (20%)", "السلوك (10%)", "Total Score"]
        ];

        // Add member data
        members.forEach(member => {
            const totalScore = (
                member.contribution * 0.4 +
                member.engagement * 0.15 +
                member.performance * 0.15 +
                member.reputation * 0.2 +
                member.comportement * 0.1
            ).toFixed(2);

            ws_data.push([
                member.name,
                member.contribution,
                member.engagement,
                member.performance,
                member.reputation,
                member.comportement,
                totalScore
            ]);
        });

        console.log("Données préparées pour l'export", ws_data);

        const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

        // Set column widths
        const colWidths = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 15 }];
        worksheet['!cols'] = colWidths;

        // Merge cells for the title
        worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }];

        // Style the title
        worksheet.A1.s = {
            font: { bold: true, sz: 16 },
            alignment: { horizontal: "center" }
        };

        // Style the header row
        const headerStyle = { font: { bold: true }, alignment: { horizontal: "center" } };
        ["A3", "B3", "C3", "D3", "E3", "F3", "G3"].forEach(cell => {
            worksheet[cell].s = headerStyle;
        });

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Member Information");

        console.log("Fichier Excel généré, tentative de téléchargement");

        // Generate the Excel file
        XLSX.writeFile(workbook, "member_information.xlsx");

        console.log("Exportation terminée avec succès");
    } catch (error) {
        console.error("Erreur lors de l'exportation vers Excel:", error);
        alert("Une erreur s'est produite lors de l'exportation. Veuillez vérifier la console pour plus de détails.");
    }
}

// Load existing data from localStorage if available
const savedMembers = JSON.parse(localStorage.getItem('members'));
if (savedMembers) {
    members = savedMembers;
    members.forEach(addMemberToTable);
}