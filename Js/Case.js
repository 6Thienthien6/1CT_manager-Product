class Product {
    constructor(productId, avatar, productName, quantity, price) {
        this.productId = productId;
        this.avatar = avatar;
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;


    }

}
class Helper {
    static formatCurrency(number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
}
var products = [new Product(1, "img/MSI-Delta-15-H2.jpeg", "MSI Delta15", 1, 35000000, ),
    new Product(2, "img/asusF571GT.jpg", "AsusF571GT", 1, 23000000),
    new Product(3, "img/msiGF63.png", "MSI GF63", 1, 20000000),
    new Product(4, "img/msiGL75.jpg", "MSI GL75", 1, 25000000),
];



function renderProduct(products) {
    let tbProduct = document.querySelector('.table>tbody');
    let htmls = products.map(function(product) {
        return `<tr id="tr_${product.productId}">
        <td>${product.productId}</td>
        <td> <img src=${product.avatar}></td>
        <td>${product.productName}</td>
        <td>${product.quantity}</td>
        <td>${Helper.formatCurrency(product.price)}</td>
        <td><button class="btn btn-warning" onclick="change(${product.productId})">edit</button>
            <button class="btn btn-danger" onclick="remove(${product.productId})">remove</button></td>

    </tr>`;

    })
    tbProduct.innerHTML = htmls.join("");
}

function Add() {

    let avatar = document.querySelector("#idavatar").value;
    let productname = document.querySelector("#productname").value;
    let quantity = Number(document.querySelector("#quantity").value);
    let price = Number(document.querySelector("#price").value);
    let productId = getLastId() + 1;
    let product = new Product(productId, avatar, productname, quantity, price);

    products.push(product);
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
    document.querySelector("#id_avatar").value = "";
    document.querySelector("#productname").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector("#price").value = "";
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

    tr.children[1].innerHTML = `<input type='text' value = '${product.avatar}'/>`
    tr.children[2].innerHTML = `<input type='text' value = '${product.productName}'/>`
    tr.children[3].innerHTML = `<input type='text' value = '${product.quantity}'/>`
    tr.children[4].innerHTML = `<input type='text' value = '${product.price}'/>`

};

function updateProduct(pdtId) {
    return
}





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
    let result = products.filter(function(Product) {
        return (Product.productName.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1) ||
            Product.price == Number(searchInput.value)
    });
    renderProduct(result);
}

function ready() {
    // init();
    renderProduct(products);


}
ready();