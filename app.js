if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    //remove button
    var removeCartButton = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener('click', removeCart)
    }

    //mencegah negative value pada quantity input
    var inputQuantity = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < inputQuantity.length; i++) {
        var input = inputQuantity[i];
        input.addEventListener('change', quantityChanged);
    }

    //menambah item ke cart
    var addToCartButton = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButton.length; i++) {
        var addToCart = addToCartButton[i];
        addToCart.addEventListener('click', addToCartClicked);
    }

    //puchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    var total = document.getElementsByClassName('cart-total-price')[0].innerText;
    alert('Total ' + total + '\nThank you for the purchase');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotalCart()
}

function addToCartClicked(e) {
    var addButton = e.target;
    var shopItem = addButton.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, image);
}

function addItemToCart(title, price, image) {
    //buat element div baru
    var cartRow = document.createElement('div');
    //tambahkan class untuk styling
    cartRow.classList.add('cart-row');
    //buat element cart item
    var cartItem = document.getElementsByClassName('cart-items')[0];
    var cartRowContents = `
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${image}" width="100" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
    cartRow.innerHTML = cartRowContents;
    //kalau item sudah dimasukkan
    var cartItemName = cartItem.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == title) {
        return;
        }
    }
    //masukkan ke cart item
    cartItem.append(cartRow);
    //tambah cartRow baru, dan masukkan button ke addEventListener
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCart);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    updateTotalCart()
}

function quantityChanged(e) {
    var inputChanged = e.target;
    if (isNaN(inputChanged.value) || inputChanged.value <= 0) {
        inputChanged.value = 1;
    }
    updateTotalCart();
}

function removeCart(e) {
    var buttonClicked = e.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotalCart();
}

function updateTotalCart() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total += (price * quantity);
    }
    total = (Math.round(total) * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$ ' + total;
}