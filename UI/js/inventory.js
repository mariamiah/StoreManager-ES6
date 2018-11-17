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
const uri = "https://storemanager15.herokuapp.com/api/v2/products"
document.getElementById('allproducts').addEventListener('load', fetchProducts);

function fetchProducts(){
    fetch(uri, {
        headers: {
            'Content-Type':'application/json, */*',
            'Accept':'application/json'
        }       
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        if(json.Products.length == 0){
            document.getElementById('productmsg').innerHTML = "No products at the moment";

        }else{
            let i;
            for(i=0; i< json.length; i++){
                document.getElementsByTagName('tr').innerHTML = json.Products;
            }
    
        }

    })
    .catch((err)=> console.log(err))
}
