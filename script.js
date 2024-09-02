const submitBtn = document.getElementById("submit");
let editIndex = null; // To keep track of the index of the item being edited

// Initialize studentsList as an empty array
let studentsList = [];

// Function to get data from the form
const getData = () => {
    const name = document.getElementById('name').value.trim();
    const studentID = document.getElementById('studentID').value.trim();
    const studentClass = document.getElementById('class').value.trim();
    const rollNo = document.getElementById('rollNo').value.trim();

    // Validate input fields
    if (!name || !studentID || !studentClass || !rollNo) {
        alert("All fields are required!");
        return false;
    }

    if (isNaN(studentID) || isNaN(rollNo)) {
        alert("Student ID and Roll Number must be numbers.");
        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name must contain only letters.");
        return false;
    }

    // Check if the data is valid
    return {
        name,
        studentID,
        studentClass,
        rollNo
    };
};

// Function to show data on the page
const showData = () => {
    let cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ''; // Clear the current content

    studentsList.forEach((item, index) => {
        let card = `
        <div class="card">
            <div class="info">
                <p><strong>Name</strong> : ${item.name}</p>
                <p><strong>Student ID</strong> : ${item.studentID}</p>
                <p><strong>Class</strong> : ${item.studentClass}</p>
                <p><strong>Roll No</strong> : ${item.rollNo}</p>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="deleteData(${index})">Delete</button>
            </div>
        </div>`;
        cardContainer.innerHTML += card; // Append the new card
    });
};

// Function to handle the edit action
const editData = (index) => {
    const student = studentsList[index];
    document.getElementById('name').value = student.name;
    document.getElementById('studentID').value = student.studentID;
    document.getElementById('class').value = student.studentClass;
    document.getElementById('rollNo').value = student.rollNo;

    editIndex = index; // Set the editIndex to the current index
    submitBtn.innerText = "Update"; // Change button text to 'Update'
};

// Function to delete data
const deleteData = (index) => {
    studentsList.splice(index, 1);
    showData();
};

// Event listener for the submit/update button
submitBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

    const formData = getData();
    if (formData) {
        if (editIndex === null) {
            studentsList.push(formData); // Add new student
        } else {
            studentsList[editIndex] = formData; // Update existing student
            submitBtn.innerText = "Submit"; // Reset button text to 'Submit'
            editIndex = null; // Reset editIndex
        }
        showData();
        document.getElementById("studentForm").reset(); // Reset form after submission
    }
});

// Initial call to display any data (if any)
showData();
