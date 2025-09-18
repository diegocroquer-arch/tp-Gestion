const user = "https://64fb193acb9c00518f7aa434.mockapi.io/api/v1/userList";
const cards = document.querySelector(".cards");

fetch(user)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.id = element.id;
      card.innerHTML = `
        <h2>${element.name}</h2>
        <p>Email: ${element.email}</p>
        <p>id: ${element.id}</p>
      `;

      const buttons = document.createElement("div");
      buttons.innerHTML = `
        <button class="edit button">Editar</button>
        <button class="delete button">Eliminar</button>
      `;
      card.appendChild(buttons);
      cards.appendChild(card);

      const editButtons = document.querySelectorAll(".edit-button");
      const deleteButtons = document.querySelectorAll(".delete-button");

      buttons.querySelector(".edit").addEventListener("click", () => {
        const newName = prompt("Nuevo nombre:", element.name);
        const newEmail = prompt("Nuevo email:", element.email);
        if (newName && newEmail) {
          fetch(`${user}/${element.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName, email: newEmail }),
          })
            .then((res) => res.json())
            .then((updated) => {
              card.querySelector("h2").textContent = updated.name;
              card.querySelector("p").textContent = `Email: ${updated.email}`;
              console.log("Usuario actualizado:", updated);
            });
        }
      });

      buttons.querySelector(".delete").addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
          fetch(`${user}/${element.id}`, {
            method: "DELETE",
          }).then((res) => {
            if (res.ok) {
              card.remove();
              console.log("Usuario eliminado");
            } else {
              console.error("Error al eliminar el usuario");
            }
          });
        }
      });
    });
  });

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
