let products = [
  { name: "Product 1", price: 10 },
  { name: "Product 2", price: 15 },
  { name: "Product 3", price: 20 },
];

let bill = [];

function addProduct() {
  let productName = document.getElementById("product").value;
  let quantity = document.getElementById("quantity").value;
  let product = products.find((p) => p.name === productName);
  let existingProduct = bill.find((p) => p.name === productName);
  if (product) {
    if (quantity > 0) {
      if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
        existingProduct.totalPrice =
          existingProduct.quantity * existingProduct.price;
      } else {
        let totalPrice = parseInt(quantity) * product.price;
        bill.push({
          name: product.name,
          quantity: parseInt(quantity),
          price: product.price,
          totalPrice: totalPrice,
        });
      }
      renderBill();
      updateProductDropdown();
      updateTotalAmount();
    } else {
      alert("Invalid product or quantity!");
    }
  } else {
    alert("Invalid product or quantity!");
  }
}
function updateTotalAmount() {
  let totalAmount = 0;
  bill.forEach((p) => (totalAmount += p.totalPrice));
  document.getElementById("totalAmount").innerText = totalAmount.toFixed(2);
}

function updateProductDropdown() {
  let productSelect = document.getElementById("product");
  productSelect.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let option = document.createElement("option");
    option.value = products[i].name;
    option.textContent = products[i].name;
    productSelect.appendChild(option);
  }
}
function removeItem(index) {
  bill.splice(index, 1);
  renderBill();
  updateProductDropdown();
  updateTotalAmount();
}

function renderBill() {
  let table = document.getElementById("billTable");
  table.innerHTML = `
   <tr>
     <th>Product Name</th>
     <th>Quantity</th>
     <th>Price</th>
     <th>Amount</th>
     <th></th>
   </tr>
 `;
  for (let i = 0; i < bill.length; i++) {
    let row = table.insertRow(-1);
    let productNameCell = row.insertCell(0);
    let quantityCell = row.insertCell(1);
    let priceCell = row.insertCell(2);
    let amountCell = row.insertCell(3);
    let removeCell = row.insertCell(4);
    productNameCell.innerHTML = bill[i].name;
    quantityCell.innerHTML = bill[i].quantity;
    priceCell.innerHTML = bill[i].price;
    amountCell.innerHTML=bill[i].totalPrice;
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.onclick = function() { removeItem(i); };
    removeCell.appendChild(removeButton);
  }
}


function generateBill() {
  var doc = new jsPDF();
  var sellerName = document.getElementById("sellerName").value;
  var table = document.getElementById("billTable");
  var totalAmount = 0;
  var rows = [];

  for (var i = 1; i < table.rows.length; i++) {
    var productName = table.rows[i].cells[0].innerHTML;
    var quantity = parseInt(table.rows[i].cells[1].innerHTML);
    var price = parseFloat(table.rows[i].cells[2].innerHTML);
    var amount = price*quantity;
    totalAmount += amount;

    rows.push([productName, quantity, price.toFixed(2), amount.toFixed(2)]);
  }

  doc.text("Bill Details", 10, 10);
  doc.text("Seller Name: " + sellerName, 10, 20);
  doc.autoTable({
    startY: 30,
    head: [["Product Name", "Quantity","Price","Amount"]],
    body: rows,
    theme: "grid",
  });
  doc.text(
    "Total Amount: " + totalAmount.toFixed(2),
    10,
    doc.autoTable.previous.finalY + 10
  );
  doc.save("bill");
}


function addNewProduct() {
  let productName = prompt("Enter product name:");
  let price = prompt("Enter product price:");
  let productSelect = document.getElementById("product");
  let option = document.createElement("option");
  option.value = productName;
  option.text = productName;
  productSelect.add(option);
  if (productName && price && quantity) {
    products.push({
      name: productName,
      price: parseInt(price),
      quantity: parseInt(quantity),
    });
    alert("Product added successfully!");
  } else {
    alert("Invalid input!");
  }
}
