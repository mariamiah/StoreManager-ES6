//Add an Event listener
document.getElementById('addProductForm').addEventListener("submit", addProduct)
//Function to fetch the add_product API
function addProduct(e){
    e.preventDefault()
    // Fetch API to add a product
    let productName = document.getElementById("fname").value;
    let categoryName = document.getElementById('select').value;
    let price = document.getElementById('ccnum').value;
    let quantity = document.getElementById('productQuantity').value;
    fetch("https://storemanager15.herokuapp.com/api/v2/products",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, */*',
            'Authorization':'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({product_quantity : quantity,
                              product_name: productName,
                              category_name: categoryName,
                              price:price,
                              })
    })
    .then((response)=> response.json())
    .then((json)=>{
            console.log(json)
            document.getElementById('productmessage').innerHTML = json.message;
        
    })
}
