const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Identificate con tu nombre de usuario",
  input: "text",
  text: "Nombre",
  inputValidator: (value) => {
    return !value && "Necesitas identificarte para continuar";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  console.log(user);
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("product", { user: user, product: chatBox.value });
      console.log(chatBox.value);
      chatBox.value = "";
    }
  }
});

socket.on("productLogs", (data) => {
  let log = document.getElementById("productLogs");
  let products = "";
  data.forEach((product) => {
    products = products + `${product.user} dice: ${product.product}</br>`;
  });
  log.innerHTML = products;
});
