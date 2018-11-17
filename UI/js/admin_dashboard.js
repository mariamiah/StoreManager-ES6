const current_admin_username = localStorage.getItem('username')
document.getElementById('adminWelcome').innerHTML = "Welcome " + current_admin_username+"!"+ "(Admin)";
// Implement auto current date
let Today = new Date();
document.getElementById('date').innerHTML=Today;

