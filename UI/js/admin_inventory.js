// Search products from inventory table
function productSearch(){
    let input = document.getElementById("myInput");
    let searchFilter = input.value.toUpperCase();
    let table = document.getElementById('inventory');
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
// Fetch product list for administrator view
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
                <td><input type="submit" value="Edit"></td>
                <td><input type="submit" value="Delete"></td>
                </tr>

                `
}
function fetchAdminProducts(){
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
            document.getElementById('adminprodmsg').innerHTML = "No products at the moment";
        }else{
            document.getElementById('adminproductInventory').innerHTML = `
            <h4 class="productHeading"> Available Products(${json.Products.length})</h4>
            <table id="inventory">
            <th>Product_id</th><th>Product Name</th><th>Price</th>
            <th>Product Code</th><th>Stock Quantity</th><th>Category</th>
            <th>Date Added</th><th>Modify Product</th><th></th>
            ${json.Products.map(productTemplate).join("")}   
            </table>
            `
            }
            
         })
    .catch((err) => console.log(err))

    }


