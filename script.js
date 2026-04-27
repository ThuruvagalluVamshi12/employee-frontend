const API_URL = "https://amplifier-powdered-saggy.ngrok-free.dev/employees";

function handleLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch(API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.text())
    .then(result => {

        if (result === "SUCCESS") {

            document.getElementById('loginSection').classList.add('hidden');
            document.getElementById('dashboardSection').classList.remove('hidden');

            loadEmployees(); // 🔥 call backend

        } else {
            alert("Invalid Login");
        }

    });
}
function loadEmployees() {

    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {

        const tableBody = document.getElementById('employeeTableBody');

        tableBody.innerHTML = data.map(emp => `
            <tr class="hover:bg-gray-50">
                <td class="p-4">${emp.id}</td>
                <td class="p-4">${emp.firstName} ${emp.lastName}</td>
                <td class="p-4">${emp.email}</td>
                <td class="p-4">${emp.phone}</td>
                <td class="p-4">${emp.department}</td>
                <td class="p-4">
                    <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        ${emp.status}
                    </span>
                </td>
                <td class="p-4">View | Edit | Disable</td>
            </tr>
        `).join('');

    });
}
function handleLogout() {
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
}