const current_admin_username = localStorage.getItem('username')
document.getElementById('adminWelcome').innerHTML = "Welcome " + current_admin_username+"!"+ "(Admin)";
// Implement auto current date
let Today = new Date();
document.getElementById('date').innerHTML=Today;

// Search through the sales records table for administrator
function saleSearch(){
    let input = document.getElementById("myInput");
    let searchFilter = input.value.toUpperCase();
    let table = document.getElementById('adminsalestable');
    let tr = table.getElementsByTagName("tr");
    let i;
    for(i=0; i<tr.length; i++){
        td = tr[i].getElementsByTagName('td')[6];
        if (td){
            if (td.innerHTML.toUpperCase().indexOf(searchFilter)>-1){
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }

        }
    }
}

// Fetch all sales
function saleTemplate(data){
    return `
                <tr>
                <td>${data.sale_id}</td>
                <td>${data.product_name}</td>
                <td>${data.price}</td>
                <td>${data.product_quantity}</td>
                <td>${data.total_amount}</td>
                <td>${data.date_sold}</td>
                <td>${data.username}</td>
                </tr>
                `
}

function fetchSales(){
    const uri = "http://localhost:5000/api/v2/sales"
    fetch(uri, {
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json, */*',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        }       
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json);
        if(json.Sales.length == 0){
            document.getElementById('salemsg').innerHTML = "No sales at the moment";
        }else{
            document.getElementById('salesTable').innerHTML = `
            <h4 class="saleHeading"> All Sales(${json.Sales.length})</h4>
            <table id="adminsalestable">
            <th>Record_id</th><th>Product Name</th><th>Price</th>
            <th>Product Quantity</th><th>Total Amount</th><th>Date Added</th>
            <th>Sold By</th>
            ${json.Sales.map(saleTemplate).join(" ")}   
            </table>
            `
        }
            
         })
    .catch((err) => console.log(err))
    }

