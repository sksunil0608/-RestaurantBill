
form.addEventListener('submit',addBill)
form = document.getElementById('form');
getBill()

function showBillOnPage(response){
    
    for(let i = 0;i<response.data.length;i++){
        let li = document.createElement('li');
    let detail = document.createElement('div');
        detail.id = response.data[i]._id
        let p = document.createElement('p')
        for(key in response.data[i]){
            p.innerHTML = `<strong>Dish Name</strong>:${response.data[i].dish_name}
            <strong>Selling Price:</strong>${response.data[i].dish_price}
            <strong>Product Category:</strong>${response.data[i].dish_category}`
    }
    detail.appendChild(p)
    let delete_btn = document.createElement('button');
    delete_btn.value = response.data[i]._id
    delete_btn.textContent = "Delete"
    delete_btn.addEventListener('click',function(event) {
        event.preventDefault();
        deleteBIll(delete_btn.value);
    });
    let edit_btn = document.createElement('button')
    edit_btn.value = response.data[i]._id
    edit_btn.textContent = "Edit"
    edit_btn.addEventListener('click',function(event) {
        event.preventDefault();
        updateBIll(edit_btn.value);
    });
    
    detail.appendChild(delete_btn)
    detail.appendChild(edit_btn)
    li.appendChild(detail)
    ul = document.querySelector(`#${response.data[i].dish_category}`)
    ul.appendChild(detail)
}
}
async function getBill(){
    axios.get('https://crudcrud.com/api/ff18aea0443443a78cd609a2bd73560b/bill-data')
    .then((response)=>{
        showBillOnPage(response)
    }).catch((err)=>{
        console.log(err)
    })
}

async function addBill(event){
    event.preventDefault();

    const dish_name = event.target.querySelector('#dish-name').value;
    const dish_price = event.target.querySelector('#dish-price').value;
    const dish_category = event.target.querySelector('#table-category').value;
    const obj = {
        dish_name,
        dish_price,
        dish_category
    }
    axios.post('https://crudcrud.com/api/ff18aea0443443a78cd609a2bd73560b/bill-data',obj).
    then((response)=>{
        location.reload();
    }).catch((err)=>{
        console.log(err)
    })
}



function deleteOnPage(id){
    let del_elem = document.getElementById(id)
    del_elem.remove();
}
async function deleteBIll(id){
    
    axios.delete(`https://crudcrud.com/api/ff18aea0443443a78cd609a2bd73560b/bill-data/${id}`)
    .then((response)=>{
        deleteOnPage(id);
    }).catch((err)=>{
        console.log(err)
    })
}

function showEditpage(data){

        document.querySelector('#dish-name').value = data.dish_name
        document.querySelector('#dish-price').value = data.dish_price
        document.querySelector('#table-category').value = data.dish_category


    }

async function updateBIll(id){
    await axios(`https://crudcrud.com/api/ff18aea0443443a78cd609a2bd73560b/bill-data/${id}`)
    .then((response)=>{
        showEditpage(response.data)
    }).catch((err)=>{
        console.log(err)
    })
    let update = document.createElement('button')
    update.textContent="update"
    document.querySelector('#form-div').appendChild(update)


    
    update.addEventListener('click',putData)

    async function putData(event){
        event.preventDefault()
        const dish_name = document.querySelector('#dish-name').value;
        const dish_price = document.querySelector('#dish-price').value;
        const dish_category = document.querySelector('#table-category').value;

        const obj ={
            dish_name,
            dish_price,
            dish_category
        }

        await axios.put(`https://crudcrud.com/api/ff18aea0443443a78cd609a2bd73560b/bill-data/${id}`,obj)
        .then((res)=>{
            location.reload();
        }).catch((err)=>{
            console.log(err)
        })
    }

}