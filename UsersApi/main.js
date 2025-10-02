const fetchBtn = document.getElementById("fetchUsersBtn");
const usersContainer = document.getElementById("usersList");
function fetchUsers() {
  usersContainer.innerHTML = "<p>Loading users... please wait </p>";
  fetch("https://randomuser.me/api/?results=10")
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Network error: " + response.status);
      }
      return response.json();
    })
    .then(function(data) {
      displayUsers(data.results); 
    })
    .catch(function(error) {
      usersContainer.innerHTML = `<p style="color:red;">Oops! ${error.message}</p>`;
    });
}

function displayUsers(users) {
  usersContainer.innerHTML = ""; 
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${u.name.first} ${u.name.last}</h3>
      <p><strong>Email:</strong> <a href="mailto:${u.email}">${u.email}</a></p>
      <p><strong>City:</strong> ${u.location.city}</p>
      <p><strong>Country:</strong> ${u.location.country}</p>
      <p><strong>Phone:</strong> ${u.phone}</p>
    `;
    usersContainer.appendChild(card);
  }
}
fetchBtn.addEventListener("click", fetchUsers);