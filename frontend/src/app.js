const employeeForm = document.getElementById("employeeForm");
const employeeTable = document.getElementById("employeeTable");


// ============================
// Get employees
// ============================

async function loadEmployees() {

    try {

        const response = await fetch("/api/employees");

        if (!response.ok) {
            throw new Error("Failed to load employees");
        }

        const employees = await response.json();

        employeeTable.innerHTML = "";

        employees.forEach(employee => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>

                <td>
                    <button onclick="deleteEmployee(${employee.id})">
                        Delete
                    </button>
                </td>
            `;

            employeeTable.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        alert("Could not connect to backend");

    }
}


// ============================
// Create employee
// ============================

employeeForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const employee = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        department: document.getElementById("department").value

    };

    try {

        const response = await fetch("/api/employees", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employee)

        });

        if (!response.ok) {
            throw new Error("Failed to create employee");
        }

        employeeForm.reset();

        await loadEmployees();

    } catch (error) {

        console.error(error);

        alert("Could not create employee");

    }

});


// ============================
// Delete employee
// ============================

async function deleteEmployee(id) {

    try {

        const response = await fetch(`/api/employees/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {
            throw new Error("Failed to delete employee");
        }

        await loadEmployees();

    } catch (error) {

        console.error(error);

        alert("Could not delete employee");

    }

}


// ============================
// Initial load
// ============================

loadEmployees();