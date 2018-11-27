// Add Event listener
document.getElementById('addCategoryForm').addEventListener('submit', addCategory);

function addCategory(e){
    e.preventDefault()
    //Fetch API to add a new category
    const categoryAPI = "http://localhost:5000/api/v2/categories"
    let categoryName = document.getElementById('categoryName').value;
    fetch(categoryAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, */*',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        },
        body: JSON.stringify({category_name: categoryName})
    })
    .then((response)=> {
        return response.json()
    })
    .then((json)=> {
        if (json){
            console.log(json)
            document.getElementById('newCategoryMessage').innerHTML = json.message
        }
    })
}

// Fetch API to fetch all available categories

