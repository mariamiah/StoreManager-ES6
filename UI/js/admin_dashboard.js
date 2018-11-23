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
