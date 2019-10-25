if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButton = document.getElementsByClassName('btn-danger');
    for(var i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener('click', removeCart)
    }

    //mencegah -value pada quantity input
    var inputQuantity = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < inputQuantity.length; i++) {
        var input = inputQuantity[i];
        input.addEventListener('change', quantityChanged);
    }

    var addToCartButton = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i < addToCartButton.length; i++) {
        var addToCart = addToCartButton[i];
        addToCart.addEventListener('click', addToCartClicked); 
    }
}

function addItemToCart(title, price, image) {
    var cartRow = createElement('div');
    cartRow.classList.add('cart-row');
    
}

function addToCartClicked(e) {
    var addButton = e.target;
    var shopItem = addButton.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    addItemToCart(title, price, image);
    
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