const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleEnterSubmit(event) {
  event.preventDefault();
  const roomNameInput = welcome.querySelector("#enter_room ");
  const userNameInput = welcome.querySelector("#enter_name ");

  socket.emit("enter_room", roomNameInput.value, userNameInput.value, showRoom);
  roomName = roomNameInput.value;
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

form.addEventListener("submit", handleEnterSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
});

socket.on("new_message", addMessage);

socket.on("bye", (user) => {
  addMessage(`${user} left ㅠㅠ`);
});
