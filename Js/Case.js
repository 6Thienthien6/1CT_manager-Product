class Product {
    constructor(productId, avatar, productName, quantity, price) {
        this.productId = productId;
        this.avatar = avatar;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
    }

}

var products = [new Product(1, "img/MSI-Delta-15-H2.jpeg", "MSI Delta15", 1, 35000000, ),
    new Product(2, "img/asusF571GT.jpg", "AsusF571GT", 1, 23000000),
    new Product(3, "img/msiGF63.png", "MSI GF63", 1, 20000000),
    new Product(4, "img/msiGL75.jpg", "MSI GL73", 1, 25000000),
    new Product(5, "img/msiGL75.jpg", "MSI GL65", 1, 23000000),
    new Product(6, "img/msiGL75.jpg", "MSI GL71", 1, 24000000),
    new Product(7, "img/msiGL75.jpg", "MSI GL78", 1, 29000000),
    new Product(8, "img/msiGL75.jpg", "MSI GL62", 1, 22000000),
    new Product(9, "img/mouselogitech_g102.jpg", "Logitech G102", 1, 180000),
];
// var products = []

// function init() {
//     if (localStorage.getItem("product_data") == null) {
//         products = [new Product(1, "img/MSI-Delta-15-H2.jpeg", "MSI Delta15", 1, 35000000, ),
//             new Product(2, "img/asusF571GT.jpg", "AsusF571GT", 1, 23000000),
//             new Product(3, "img/msiGF63.png", "MSI GF63", 1, 20000000),
//             new Product(4, "img/msiGL75.jpg", "MSI GL73", 1, 25000000),
//             new Product(5, "img/msiGL75.jpg", "MSI GL65", 1, 23000000),
//             new Product(6, "img/msiGL75.jpg", "MSI GL71", 1, 24000000),
//             new Product(7, "img/msiGL75.jpg", "MSI GL78", 1, 29000000),
//             new Product(8, "img/msiGL75.jpg", "MSI GL62", 1, 22000000),
//             new Product(9, "img/mouselogitech_g102.jpg", "Logitech G102", 1, 180000),
//         ]
//         localStorage.setItem("product_data", JSON.stringify(products))
//     } else {
//         products = JSON.parse(localStorage.getItem("product_data"));
//     }
// }
class Helper {
    static formatCurrency(number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
}


function renderProduct(data) {
    let tbProduct = document.querySelector('.table>tbody');
    let html = data.map(function(product) {
        return `<tr id="tr_${product.productId}">
        <td >${product.productId}</td>
        <td class ="text-right"><img src="${product.avatar}"></td>
        <td>${product.productName}</td>
        <td class ="text-right">${product.quantity}</td>
        <td class ="text-right">${Helper.formatCurrency(product.price)}</td>
        <td id ="action_${product.productId}" class='text-right'>
        <button class="btn btn-warning" onclick="change(${product.productId})">edit</button>
        <button class="btn btn-warning d-none" id="cancel-btn" onclick="cancel(${product.productId})">cancel</button>
            <button class="btn btn-danger" onclick="remove(${product.productId})">remove</button>
            </td>

    </tr>`;

    })
    tbProduct.innerHTML = html.join("");
}

function Add() {

    let avatar = document.querySelector("#idavatar").value;
    let productName = document.querySelector("#productname").value;
    let quantity = Number(document.querySelector("#quantity").value);
    let price = Number(document.querySelector("#price").value);
    let productId = getLastId() + 1;
    let product = new Product(productId, avatar, productName, quantity, price);

    products.push(product);
    //localStorage.setItem("product_data", JSON.stringify(products))
    renderProduct(products);
    resetForm();
}


function getLastId() {
    let productTemp = [...products];
    let maxId = productTemp.sort(function(pdt1, pdt2) {
        return pdt2.productId - pdt1.productId
    })[0].productId
    return maxId

}

function resetForm() {
    document.querySelector("#idavatar").value = "";
    document.querySelector("#productname").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
    renderProduct(products);
}

function validation(field) {
    return field != null && field.trim() != '';
}

function remove(productId) {
    let confirmed = window.confirm("bạn có muốn xóa sản phẩm này không");
    if (confirmed) {
        let position = products.findIndex(function(pdt) {
            return pdt.productId == productId;
        })
        products.splice(position, 1);
        renderProduct(products);
    }
}

function getProductById(pdtId) {
    return products.find(function(pdt) {
        return pdt.productId == pdtId
    })
}

function change(pdtId) {

    let tr = document.getElementById(`tr_${pdtId}`);
    let product = getProductById(pdtId);

    tr.children[1].innerHTML = `<input type="text"  value = '${product.avatar}'/>`
    tr.children[2].innerHTML = `<input  type="text"  value = '${product.productName}'/>`
    tr.children[3].innerHTML = `<input  type="text" value = '${product.quantity}'/>`
    tr.children[4].innerHTML = `<input type="text" value = '${product.price}'/>`
    let action = document.getElementById(`action_${pdtId}`);
    action.children[0].classList.add('d-none');
    action.children[1].classList.remove('d-none');
    action.children[2].classList.remove('d-none');


}

function cancel(pdtId) {
    let tr = document.getElementById(`tr_${pdtId}`);
    let product = getProductById(pdtId);

    tr.children[1].innerHTML = `<img src="${product.avatar}">`;
    tr.children[2].innerHTML = product.productName;
    tr.children[3].innerHTML = product.quantity;
    tr.children[4].innerHTML = Helper.formatCurrency(product.price);
    let action = document.getElementById(`action_${pdtId}`);
    action.children[0].classList.remove('d-none');
    action.children[1].classList.add('d-none');
    action.children[2].classList.add('d-none');
}




// function update(pdtId) {
//     let tr = document.getElementById(`tr_${pdtId}`);
//     let product = getProductById(pdtId);
//     let newAvatar = tr.children[1].children[0].value;
//     let newProductName = tr.children[1].children[0].value;
//     let newQuantity = Number(tr.children[2].children[0].value);
//     let newPrice = Number(tr.children[3].children[0].value);
//     product.avatar = newAvatar;
//     product.productName = newProductName;
//     product.quantity = newQuantity;
//     product.price = newPrice;
// }

// function cancel() {
//     resetForm();
//     // document.querySelector("#create-btn").classList.remove("d-none");
//     document.querySelector("#update-btn").classList.add("d-none");
//     document.querySelector("#cancel-btn").classList.add("d-none");
// }




const sort_acs = "acs";
const sort_desc = "desc";

function sort(direct) {
    if (direct == sort_acs) {
        products.sort(function(pdt1, pdt2) {
            return pdt1.price - pdt2.price;
        })
    } else {
        products.reverse();
    }
    renderProduct(products);
}


function search(searchInput) {
    let result = products.filter(function(product) {
        return (
            product.productName.toLowerCase().indexOf(searchInput.value.toLowerCase()) !=
            -1 ||
            product.price == Number(searchInput.value)
        );
    });
    renderProduct(result);
}


function ready() {
    // init();
    renderProduct(products);

}
ready();