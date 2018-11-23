var productNames = []
var Quantity = []
var productPrice = []

function displayProductTable(){
    let tableData = "<table><tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total Amount</th></tr>"
    let totalAmount = 0;
    for(let i=0; i< productNames.length; i++){
        totalAmount += Quantity[i]* productPrice[i]
        tableData += "<tr><td>"+ productNames[i]+ "</td><td>"+
        Quantity[i]+ "</td><td>"+ productPrice[i]+ "</td><td>"+
        Quantity[i]* productPrice[i]+ "</td><td><button onclick= 'delProduct("+i+")'>Delete Product</button></td></tr>"
    }
    tableData+= "<tr><td></td><td></td><td></td><td>"+
    totalAmount + "</td></tr></table>"
    document.getElementById('productCart').innerHTML = tableData;
}
// Add cart table
function addItem(){
    var productName = document.getElementById('productName').value;
    var productQuantity = document.getElementById('productQuantity').value;
    fetch("https://storemanager15.herokuapp.com/api/v2/sales", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify({product_quantity: productQuantity, product_name: productName})
    })
    .then((response)=>response.json())
    .then(json => {
        if(json.message == "record created successfully"){
            productNames.push(document.getElementById('productName').value);
            Quantity.push(parseInt(document.getElementById('productQuantity').value));
            productPrice.push(parseInt(document.getElementById('UnitPrice').value));
            let justAddedPrice = productPrice.slice(-1)
            if(justAddedPrice != 100){
                console.log('Enter the correct Price')
            }else{
                displayProductTable()
            }
        }else{
            document.getElementById('cartMessage').innerHTML = json.message;
        }
    })
    


}

function delProduct(a){
    productNames.splice(a, 1);
    Quantity.splice(a, 1);
    productPrice.splice(a, 1);
    displayProductTable()
    
}
