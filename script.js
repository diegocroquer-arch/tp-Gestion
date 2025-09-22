const userList = "https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList";
const cards = document.querySelector(".cards");

//abrir modal//
let create = document.getElementById("load-users");
create.addEventListener("click", function (e) {
  document.getElementById("window-notice").style.display = "flex";
});
//abrir modal//

//cerrar modal//

let close_create = document.getElementById("close");
close_create.addEventListener("click", function (e) {
  document.getElementById("window-notice").style.display = "none";
  document.getElementById("window-notice .content").style.display = "none";
});
//cerrar modal//

function deleteUser(id) {
  fetch(`${userList}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      document.querySelector(`.card[data-id='${id}']`).remove();
      console.log("Usuario eliminado");
    } else {
      console.error("Error al eliminar el usuario");
    }
  });
}

function editUser(id, newName, newEmail) {
  fetch(`${userList}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, email: newEmail }),
  })
    .then((res) => res.json())
    .then((updatedUser) => {
      const card = document.querySelector(`.card[data-id='${id}']`);
      card.querySelector("h2").textContent = updatedUser.name;
      card.querySelector("p").textContent = `Email: ${updatedUser.email}`;
      console.log("Usuario actualizado:", updatedUser);
    });
}

function getUsers() {
  console.log("Fetching users...");
  fetch(userList)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        createCard(user);
      });
    });
}
getUsers();

function createCard(user) {
  const card = document.createElement("div");
  console.log("Users fetched:", user);
  card.classList.add("card");
  card.dataset.id = user.id;
  card.innerHTML = `
  <h2>${user.name}</h2>
  <p>Email: ${user.email}</p>
  <p>id: ${user.id}</p>
`;
  const deleteButtons = document.createElement("button");
  deleteButtons.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    const userId = card.dataset.id;
    deleteUser(userId);
  });
  deleteButtons.textContent = "Eliminar";
  deleteButtons.classList.add("delete-button");
  card.appendChild(deleteButtons);
  cards.appendChild(card);

  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    const userId = card.dataset.id;
    const newName = prompt(
      "Ingrese el nuevo nombre:",
      card.querySelector("h2").textContent
    );
    const newEmail = prompt(
      "Ingrese el nuevo email:",
      card.querySelector("p").textContent.replace("Email: ", "")
    );
    if (newName && newEmail) {
      editUser(userId, newName, newEmail);
    } else {
      alert("Por favor, completa todos los campos.");
    }
  });
  card.appendChild(editButton);
  cards.appendChild(card);
}

const createButton = document.getElementById("create-button");

createButton.addEventListener("click", function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("name-trip-input");
  const emailInput = document.getElementById("email-trip-input");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (name && email) {
    addUser(name, email);
    nameInput.value = "";
    emailInput.value = "";
    document.getElementById("window-notice").style.display = "none";
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

function addUser(name, email) {
  fetch(userList, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email }),
  })
    .then((res) => res.json())
    .then((newUser) => {
      createCard(newUser);
      console.log("Usuario agregado:", newUser);
    });
}
// Modo oscuro /

const darkModeButton = document.getElementById("dark-mode");
darkModeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// Modo oscuro //
