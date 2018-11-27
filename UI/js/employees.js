// Fetch all users
function userTemplate(data){
    return `
                <tr>
                <td>${data.employee_id}</td>
                <td>${data.employee_name}</td>
                <td>${data.gender}</td>
                <td>${data.username}</td>
                <td>${data.email}</td>
                <td>${data.role}</td>
                <td><button id="remove">Make Admin</button></td>
                <td><button id="remove">Delete user</button></td>
                </tr>

                `
}

function fetchUsers(){
    const uri = "http://localhost:5000/api/v2/users"
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
        if(json.Users.length == 0){
            document.getElementById('employeemsg').innerHTML = "No users at the moment";
        }else{
            document.getElementById('employeeTable').innerHTML = `
            <h4 class="userHeading"> All Users(${json.Users.length})</h4>
            <table id="checkout">
            <th>Employee Id</th><th>Employee Name</th><th>Gender</th><th>User Name</th>
            <th>Email</th><th>Role</th><th></th><th></th>
            ${json.Users.map(userTemplate).join(" ")}   
            </table>
            `
            }
            
         })
    .catch((err) => console.log(err))
    }

// Search Employee List
function userSearch(){
    let input = document.getElementById("myInput");
    let searchFilter = input.value.toUpperCase();
    let table = document.getElementById('checkout');
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
