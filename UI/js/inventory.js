// Search products from inventory table
function productSearch(){
    let input = document.getElementById("myInput");
    let searchFilter = input.value.toUpperCase();
    let table = document.getElementById('inventory');
    let tr = table.getElementsByTagName("tr");
    let i;
    for(i=0; i<tr.length; i++){
        td = tr[i].getElementsByTagName('td')[2];
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
                <table id="inventory">
                <th>Product_id</th><th>Product Name</th><th>Price</th>
                <th>Product Code</th><th>Stock Quantity</th><th>Category</th>
                <th>Date Added</th><th>Action</th>
                <tr>
                <td>${data.product_id}</td>
                <td>${data.product_name}</td>
                <td>${data.price}</td>
                <td>${data.product_code}</td>
                <td>${data.product_quantity}</td>
                <td>${data.category_name}</td>
                <td>${data.date_added}</td>
                <td><input type="checkbox" name="checkbox" /></td>
                </tr>
                </table>
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
            ${json.Products.map(productTemplate).join("")}
            `
            }
            
         })
    .catch((err) => console.log(err))

    }
