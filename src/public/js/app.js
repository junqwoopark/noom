const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");

  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

function handleSubmit(event) {
  event.preventDefault();
  const messageInput = messageForm.querySelector("input");

  socket.send(makeMessage("new_message", messageInput.value));

  const li = document.createElement("li");
  li.innerText = `You: ${messageInput.value}`;
  messageList.append(li);

  messageInput.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const nickInput = nickForm.querySelector("input");

  socket.send(makeMessage("nickname", nickInput.value));
  nickInput.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
