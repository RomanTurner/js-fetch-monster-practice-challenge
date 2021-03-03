/* 
When the page loads, show the first 50 monsters. 
Each monster's name, age, and description should be shown.
Above your list of monsters, you should have a form to create a new monster. 
You should have fields for name, age, and description, and a 'Create Monster Button'.
When you click the button, the monster should be added to the list and saved in the API.
At the end of the list of monsters, show a button. When clicked, 
the button should load the next 50 monsters and show them.
!name:
!description:
!age
!id
*/

const monsterURL = "http://localhost:3000/monsters/?_limit=50&_page=1";

function createMonster(e) {
  e.preventDefault();
  let { name, age, description } = e.target;

  let formData = {
    name: name.value,
    age: age.value,
    description: description.value,
  };

  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch(monsterURL, configObject)
    .then((response) => response.json())
    .then((monster) => {
      let monsterContainer = document.getElementById("monster-container");
      monsterContainer.prepend(buildMonster(monster));
    });
}

function drawForm() {
  const form = document.createElement("form");
  form.id = "monster-form";
  const name = document.createElement("input");
  name.id = "name";
  name.placeholder = "name...";

  const age = document.createElement("input");
  age.id = "age";
  age.placeholder = "age...";

  const description = document.createElement("input");
  description.id = "description";
  description.placeholder = "description...";

  const btn = document.createElement("button");
  btn.textContent = "Create";

  form.append(name, age, description, btn);
  form.addEventListener("submit", (e) => createMonster(e));

  return form;
}

function buildMonster(monster) {
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.textContent = monster.name;
  let h4 = document.createElement("h4");
  h4.textContent = monster.age;
  let p = document.createElement("p");
  p.textContent = monster.description;
  div.append(h2, h4, p);
  return div;
}

function getMonster(url) {
  fetch(url)
    .then((response) => response.json())
    .then((monsterObj) => {
      let monsterList = Array.from(monsterObj);
      let monsterContainer = document.getElementById("monster-container");
      monsterList.forEach((monster) =>
        monsterContainer.appendChild(buildMonster(monster))
      );
    });
}

getMonster(monsterURL);
document.getElementById("create-monster").append(drawForm());
