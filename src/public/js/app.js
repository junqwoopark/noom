const messageUl = document.querySelector("ul");
const messageForm = document.querySelector("form");
const messageInput = document.querySelector("input");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();

  const input = messageInput.value;
  socket.send(input);
  messageInput.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
