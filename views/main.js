
const form = document.getElementById('form')
const priceInput = document.getElementById('price')
const nameInput = document.getElementById('product-name')
const category = document.getElementById('category')
const foodUl = document.getElementById('food')
const electronicUl = document.getElementById('electronics')
const skincareUl = document.getElementById('skin-care')

form.addEventListener("submit", onSubmit)

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/')
        .then(res => {
            for (let i = 0; i < res.data.allData.length; i++) {
                updateDom(res.data.allData[i])
            }
        })
        .catch(err => console.log(err))
})
async function onSubmit(e) {
    try {
        e.preventDefault()
        if (!priceInput.value || !nameInput.value || !category.value) {
            alert('All inputs are mandatory')
        } else {
            const productData = {
                price: priceInput.value,
                name: nameInput.value,
                category: category.value
            }
            const res = await axios.post('http://localhost:3000/add-product', productData)
            updateDom(res.data.userData)
        }
        priceInput.value = null
        nameInput.value = ''
    } catch (err) {
        console.log(err)
    }
}

function updateDom(user) {
    let item = document.createElement('li')
    item.id = `${user.id}`
    item.innerHTML = `<span id="${user.id}">${user.price} ${user.name} ${user.category}<span>
                        <button onclick=deleteUser('${user.id}')>delete</button>`
    if (user.category === 'food') {
        foodUl.appendChild(item)
    } else if (user.category === 'electronics') {
        electronicUl.appendChild(item)
    } else {
        skincareUl.appendChild(item)
    }
}

async function deleteUser(id) {
    try {
        await axios.delete(`http://localhost:3000/delete/${id}`)
        console.log('delete success')
        removeFromScreen(id)
    } catch (err) {
        console.log(err)
    }
}
function removeFromScreen(id) {
    const item = document.getElementById(`${id}`)
    item.parentNode.removeChild(item)
}