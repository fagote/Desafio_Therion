// Array para armazenar os itens em estoque
const stock = [];

// Função para adicionar um novo item ao estoque
function addItemToStock(event) {
    event.preventDefault();

    const itemName = document.getElementById("item-name").value;
    const itemQuantity = parseInt(document.getElementById("item-quantity").value, 10);
    const itemValor = parseFloat(document.getElementById("item-value").value);

    if (itemName && itemQuantity && itemValor) {
        const newItem = {
            name: itemName,
            quantity: itemQuantity,
            value: itemValor
        };

        stock.push(newItem);
        displayStock();
        document.getElementById("item-form").reset();
    } else {
        alert("Por favor, preencha o nome e a quantidade do item.");
    }
}

// Função para exibir a lista de itens em estoque
function displayStock() {
    const stockList = document.getElementById("stock-list");
    stockList.innerHTML = "";

    stock.forEach((item, index) => {
        const listItem = document.createElement("div");
        listItem.classList.add("stock-item");

        const itemInfo = `<span>${item.name}</span> - <span>Quantidade: ${item.quantity}</span> - <span>Valor: R$${item.value}</span>`;
        const editButton = `<button class="edit-button" data-index="${index}">Editar Item</button>`
        const deleteButton = `<button class="delete-button" data-index="${index}">Excluir Item</button>`;

        listItem.innerHTML = itemInfo + deleteButton + editButton;
        stockList.appendChild(listItem);
    });

   
    const deleteButtons = document.getElementsByClassName("delete-button");
    const editButtons = document.getElementsByClassName("edit-button");

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteItem);
        editButtons[i].addEventListener("click",editItem);
    }
}

function editItem(event) {
    const itemIndex = event.target.getAttribute("data-index");
    const newName = prompt("Digite o novo nome do item:");
    const newQuantity = parseInt(prompt("Digite a nova quantidade do item:"), 10);
    const newValue = parseFloat(prompt("Digite o novo valor do item:"), 10);

    if (newName && newQuantity) {
        stock[itemIndex].name = newName;
        stock[itemIndex].quantity = newQuantity;
        stock[itemIndex].value = newValue;
        displayStock();
    } else {
        alert("Por favor, preencha o nome e a quantidade do item corretamente.");
    }
}

// Função para excluir um item do estoque
function deleteItem(event) {
    const itemIndex = event.target.getAttribute("data-index");
    stock.splice(itemIndex, 1);
    displayStock();
}

// Adicionando um ouvinte de evento ao formulário para capturar o envio do novo item
document.getElementById("item-form").addEventListener("submit", addItemToStock);