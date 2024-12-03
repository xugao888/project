function submitForm(event){
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let details = document.getElementById("event-details").value;
    alert(name+", thank you for your details. We will be in touch via "+email+" shortly.");
    document.getElementById("catering-form").reset();
}


const pizza_order = "pizza_order_webdesignproject";

function getOrder() {
    return localStorage.getItem(pizza_order) === null ? [] : JSON.parse(localStorage.getItem(pizza_order));
}

function addToOrder(obj) {
    const order = getOrder();
    order.push(obj);
    localStorage.setItem(pizza_order, JSON.stringify(order));
}

function replaceOrder(order) {
    localStorage.setItem(pizza_order, JSON.stringify(order));
}

//sure why would we let the user empty the basket, we want them to buy!
// function clearOrder() {
//     localStorage.removeItem(pizza_order);
// }



function changeQuantity(quantity, name){
    const nameId = name.replace(/ /g, '');
    $("#" + nameId + "RowId").addClass("flash");

    const order = getOrder();
    const product = order.filter((e) => e.name === name);
    if(product.length > 0){
        product[0].amount = quantity;
        replaceOrder(order.map((e) => e.name === product[0].name ? product[0] : e));
    }

    setTimeout(function(){
        $("#" + nameId + "RowId").removeClass("flash")
    }, 200);

    getOrderPrice();
}

function removeItem(name){
    replaceOrder(getOrder().filter((e) => e.name !== name));
    doOrderModal();
}

function getOrderPrice(){
    let price = 0;
    let p, item;
    for(item of getOrder()){
        p = item.price;
        p = p * parseInt(item.amount);
        price += p;
    }

    if(price === 0){
        $('#orderPrice').html("");
    }else{
        $('#orderPrice').html("<h4 class='orderPrice'>Total Price: €" + price + "</h4>");
    }
}



$('#orderModal').on("shown.bs.modal", function () {
    doOrderModal();
});

function doOrderModal(){
    const order = getOrder();
    if(order.length === 0) {
        getOrderPrice();
        return $('#orderModalBody').html("<h4>Your order is empty!</h4>");
    }

    let body = "";
    let name;
    for (const item of order) {
        name = item.name.replace(/ /g, "");
        body += `
            <div class="row" id="${name}RowId">
                <div class="col-md-5 align-self-center">
                    <h5 id="order_name">${item.name}</h5>
                    <p id="order_size" class="orderSize">${item.type === "pizza" ? item.size : ""}</p>
                    <p>€<span id="order_price">${item.price}</span></p>
                </div>
                <div class="col-md-2 align-self-center">
                    <p>Quantity</p>
                    <input type="number" min=1 id="orderQuantity" value=${item.amount} onchange="changeQuantity($(this).val(), '${item.name}')">
                    <p style="margin-top: 5px;"></p>
                </div>
                <div class="col-md-3 align-self-center">
                    <img src=${item.img} alt="${item.name} pizza" class="orderImage" id="order_image"/>
                </div>
                <div class="col-md-2 align-self-center">
                    <button class="btn" onclick="removeItem('${item.name}')"><i class="fa fa-trash"></i></button>
                </div>
            </div>
        `;
    }
    $('#orderModalBody').html(body);
    getOrderPrice();
}
