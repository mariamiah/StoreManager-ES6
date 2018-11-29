var productNames = []
var Quantity = []
var productPrice = []

function displayProductTable(){
    let tableData = "<table id='checkouttable'><tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Total Amount</th><th></th></tr>"
    let totalAmount = 0;
    for(let i=0; i< productNames.length; i++){
        totalAmount += Quantity[i]* productPrice[i]
        tableData += "<tr><td>"+ productNames[i]+ "</td><td>"+
        Quantity[i]+ "</td><td>"+ productPrice[i]+ "</td><td>"+
        Quantity[i]* productPrice[i]+ "</td><td><button onclick= 'delProduct("+i+")'>Delete Product</button></td></tr>"
    }
    tableData+= "<tr><td></td><td></td><td></td><td>"+
    totalAmount + "</td></tr>+<tr><td></td><td></td><td></td><td></td><td><button id='checkoutbtn' onclick='checkout()'>Check Out</td></tr></table>"
    document.getElementById('productCart').innerHTML = tableData;
}


// Search products from inventory table
function productSearch(){
    let input = document.getElementById("myInput");
    let searchFilter = input.value.toUpperCase();
    var table = document.getElementById('inventory');
    let tr = table.getElementsByTagName("tr");
    let i;
    for(i=0; i<tr.length; i++){
        td = tr[i].getElementsByTagName('td')[1];
        if (td){
            if (td.innerHTML.toUpperCase().indexOf(searchFilter)>-1){
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }

        }
    }
}

// Fetch all products from the API
function productTemplate(data){
    return `
                <tr>
                <td>${data.product_id}</td>
                <td>${data.product_name}</td>
                <td>${data.price}</td>
                <td>${data.product_code}</td>
                <td>${data.product_quantity}</td>
                <td>${data.category_name}</td>
                <td>${data.date_added}</td>
                </tr>

                `
}

function fetchProducts(){
    const uri = "https://storemanager15.herokuapp.com/api/v2/products"
    fetch(uri, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json, */*'
        }       
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json);
        if(json.Products.length == 0){
            document.getElementById('productmsg').innerHTML = "No products at the moment";
        }else{
            document.getElementById('productInventory').innerHTML = `
            <h4 class="productHeading"> Available Products(${json.Products.length})</h4>
            <table id="inventory">
            <th>Product_id</th><th>Product Name</th><th>Price</th>
            <th>Product Code</th><th>Stock Quantity</th><th>Category</th>
            <th>Date Added</th>
            ${json.Products.map(productTemplate).join(" ")}   
            </table>
            `   
    }
}
    )}

// Add cart table
var Item = []
var productnameArray=[]
function addItem(){
    var productName = document.getElementById('productName').value;
    var productQuantity = document.getElementById('productQuantity').value;
    var price = document.getElementById('UnitPrice').value;
    let productTable = document.getElementById('inventory');
    let rows = productTable.getElementsByTagName('tr');
    for(let i=1; i< rows.length; i++){
        let specificrow = rows[i]
        let productname = specificrow.getElementsByTagName('td')[1].innerHTML;
        productnameArray.push(productname)
    }
        if(productnameArray.includes(productName)== false){
            document.getElementById('cartMessage').innerHTML= "Enter a product from the above list";
        }else{
            productNames.push(productName);
            productPrice.push(price);
            Quantity.push(productQuantity);
            displayProductTable()
        }
    }
 
    function delProduct(a){
        productNames.splice(a, 1);
        Quantity.splice(a, 1);
        productPrice.splice(a, 1);
        displayProductTable();    
    
}


// Add checkout functionality
function checkout(){
    var checkoutTable = document.getElementById('checkouttable');
    var checkoutRows = checkoutTable.getElementsByTagName('tr');
    var i;
    for(i=1; i< checkoutRows.length; i++){
        var singlerow =checkoutRows[i]
        var CartProduct = singlerow.getElementsByTagName('td')[0].innerHTML;
        var CartPrice = singlerow.getElementsByTagName('td')[2].innerHTML;
        var CartQuantity= singlerow.getElementsByTagName('td')[1].innerHTML;
        fetch("https://storemanager15.herokuapp.com/api/v2/sales",{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({product_quantity: CartQuantity,
                              product_name: CartProduct
          })
          .then((res)=> {
            return res.json();
        })
        .then(function(json){
            if(json['message'] == 'Product added successfully'){
                console.log(json);
                document.getElementById('adminerrormessage').innerHTML=json.message;
                window.location.assign('employees.html')
            }else if(json['message']=='Invalid'){
                document.getElementById('adminerrormessage').innerHTML="Username already exists, try another";
            }else{
                console.log(json);
                document.getElementById('adminerrormessage').innerHTML=json.message;
            }        
            })      
})
        
    }
   
}

    

