const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const spinner = document.getElementById('spinner')

const form = document.querySelector('main form')

/*---- Function to fetch single product ----*/
const getProduct = async () => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2NjE3MjUzMjU4OTAwMTU2MjAyOWEiLCJpYXQiOjE3NzU2NTczMzAsImV4cCI6MTc3Njg2NjkzMH0.x-mlS1DWyjCTZ_w0ag9o0wRFK4jK4D0tVzc6sMhXA0Q",
            }
        })
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`)
        return await response.json()
    } catch (e) {
        console.error(e)
        showToast(e, 'danger')
    }
}

/*---- Function to fetch all the products ----*/
const getProducts = async () => {
    spinner.classList.remove('d-none')
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2NjE3MjUzMjU4OTAwMTU2MjAyOWEiLCJpYXQiOjE3NzU2NTczMzAsImV4cCI6MTc3Njg2NjkzMH0.x-mlS1DWyjCTZ_w0ag9o0wRFK4jK4D0tVzc6sMhXA0Q",
            }
        })
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return await response.json()
    } catch (e) {
        console.error(e)
        showToast(e, 'danger')
    } finally {
        spinner.classList.add('d-none')
    }
}

/*---- Function to post new product ----*/
const postProduct = async (product) => {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2NjE3MjUzMjU4OTAwMTU2MjAyOWEiLCJpYXQiOjE3NzU2NTczMzAsImV4cCI6MTc3Njg2NjkzMH0.x-mlS1DWyjCTZ_w0ag9o0wRFK4jK4D0tVzc6sMhXA0Q",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
        if (!response.ok)
            throw new Error(`Response status: ${response.status} - ${response.statusText}`)
        await new Promise(resolve => setTimeout(resolve, 600))
        return response
    } catch (e) {
        console.error(e)
        showToast(e, 'danger')
    }
}

/*---- Function to update single product ----*/
const updateProduct = async (product) => {
    spinner.classList.remove('d-none')
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2NjE3MjUzMjU4OTAwMTU2MjAyOWEiLCJpYXQiOjE3NzU2NTczMzAsImV4cCI6MTc3Njg2NjkzMH0.x-mlS1DWyjCTZ_w0ag9o0wRFK4jK4D0tVzc6sMhXA0Q",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
        if (!response.ok)
            throw new Error(`Response status: ${response.statusText}`)
        await new Promise(resolve => setTimeout(resolve, 600))
        return response
    } catch (e) {
        console.error(e)
        showToast(e, 'danger')
    } finally {
        spinner.classList.add('d-none')
    }
}

/*---- Function to delete single product ----*/
const deleteProduct = async (product) => {
    spinner.classList.remove('d-none')
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2NjE3MjUzMjU4OTAwMTU2MjAyOWEiLCJpYXQiOjE3NzU2NTczMzAsImV4cCI6MTc3Njg2NjkzMH0.x-mlS1DWyjCTZ_w0ag9o0wRFK4jK4D0tVzc6sMhXA0Q",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
        if (!response.ok)
            throw new Error(`Response status: ${response.statusText}`)
        await new Promise(resolve => setTimeout(resolve, 400))
        return await response.json()
    } catch (e) {
        console.error(e)
        showToast(e, 'danger')
    } finally {
        spinner.classList.add('d-none')
        showToast('Post eliminato correttamente', 'success')
        const products = await getProducts()
        toggleVisibility("#product-container")
        appendList(createList(products))
    }
}

/*---- Function to show the page ----*/
const showPage = async () => {
    if (id != 'add') {
        Promise.all([getProduct(), getProducts()]).then(res => {
            console.log(res)
            const product = res[0]
            const products = res[1]
            const filteredProducts = products.filter(el => el["_id"] != id)
            console.log(filteredProducts)
            showForm(createForm(product))
            appendList(createList(filteredProducts))
            toggleVisibility('#product-container')
            toggleVisibility('#products-container')
        })
    } else {
        const products = await getProducts()
        appendList(createList(products))
        showForm(createEmptyForm())
        toggleVisibility('#product-container')
        toggleVisibility('#products-container')
    }

}

/*---- Function to create the form with the product details ----*/
const createForm = (product) => {
    return `
        <div class="row g-3">
            <div class="col-sm-4">
                <label for="productId" class="form-label">ID Prodotto</label>
                <input type="text" class="form-control bg-light" id="productId" value="${product["_id"]}"
                    readonly disabled>
                <div class="form-text small">L'ID non può essere modificato.</div>
            </div>

            <div class="col-sm-8"></div>
                <div class="col-sm-6">
                    <label for="productName" class="form-label">Nome Prodotto</label>
                    <input type="text" class="form-control" id="productName" value="${product.name}"
                        required>
                <div class="invalid-feedback">
                    È richiesto un nome per il prodotto.
                </div>
            </div>

            <div class="col-sm-6">
                <label for="productBrand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="productBrand" value="${product.brand}" required>
                <div class="invalid-feedback">
                    È richiesto il nome del brand.
                </div>
            </div>

            <div class="col-sm-6">
                <label for="productPrice" class="form-label">Prezzo ($)</label>
                <div class="input-group has-validation">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" id="productPrice" value="${product.price}"
                        step="0.01" required>
                    <div class="invalid-feedback">
                        Inserisci un prezzo valido.
                    </div>
                </div>
            </div>

            <div class="col-12">
                <label for="imageUrl" class="form-label">URL Immagine</label>
                <input type="url" class="form-control" id="imageUrl"
                    value="${product.imageUrl}"
                        required>
                <div class="invalid-feedback">
                    Inserisci un URL valido per l'immagine.
                </div>
            </div>

            <div class="col-12">
                <label for="productDescription" class="form-label">Descrizione</label>
                <textarea class="form-control" id="productDescription" rows="5"
                    required>${product.description}</textarea>
                <div class="invalid-feedback">
                    La descrizione è obbligatoria.
                </div>
            </div>
        </div>

        <hr class="my-4">

        <div class="d-flex gap-2 justify-content-end">
            <button class="btn delete-btn px-4" type="button" onclick="deleteProduct()">Elimina</button>
            <button class="btn btn-primary px-4" type="submit" onclick='checkForm()'>Salva Modifiche</button>
        </div>
    `
}

/*---- Function to create the form with empty inputs ----*/
const createEmptyForm = () => {
    return `
        <div class="row g-3">
            <div class="col-sm-8"></div>
                <div class="col-sm-6">
                    <label for="productName" class="form-label">Nome Prodotto</label>
                    <input type="text" class="form-control" id="productName" value=""
                        required>
                <div class="invalid-feedback">
                    È richiesto un nome per il prodotto.
                </div>
            </div>

            <div class="col-sm-6">
                <label for="productBrand" class="form-label">Brand</label>
                <input type="text" class="form-control" id="productBrand" value="" required>
                <div class="invalid-feedback">
                    È richiesto il nome del brand.
                </div>
            </div>

            <div class="col-sm-6">
                <label for="productPrice" class="form-label">Prezzo ($)</label>
                <div class="input-group has-validation">
                    <span class="input-group-text">$</span>
                    <input type="number" class="form-control" id="productPrice" value=""
                        step="0.01" required>
                    <div class="invalid-feedback">
                        Inserisci un prezzo valido.
                    </div>
                </div>
            </div>

            <div class="col-12">
                <label for="imageUrl" class="form-label">URL Immagine</label>
                <input type="url" class="form-control" id="imageUrl"
                    value=""
                        required>
                <div class="invalid-feedback">
                    Inserisci un URL valido per l'immagine.
                </div>
            </div>

            <div class="col-12">
                <label for="productDescription" class="form-label">Descrizione</label>
                <textarea class="form-control" id="productDescription" rows="5"
                    required></textarea>
                <div class="invalid-feedback">
                    La descrizione è obbligatoria.
                </div>
            </div>
        </div>

        <hr class="my-4">

        <div class="d-flex gap-2 justify-content-end">
            <button class="btn btn-primary px-4" type="submit" onclick='checkForm()'>Aggiungi</button>
        </div>
    `
}

/*---- Function to show the form in html ----*/
const showForm = (literal) => {
    form.innerHTML = literal
}

/*---- Event listner on "Salva modifiche" and "Aggiuingi" buttons, to check the input validity and create/update the product----*/
const checkForm = async () => {
    const name = form.querySelector('#productName').value
    const brand = form.querySelector('#productBrand').value
    const price = parseFloat(form.querySelector('#productPrice').value)
    const description = form.querySelector('#productDescription').value
    const url = form.querySelector('#imageUrl').value

    if (name && brand && price && description && url) {
        const product = {
            name: name,
            brand: brand,
            description: description,
            price: price,
            imageUrl: url
        }

        if (id != "add") {
            toggleVisibility('#product-container')
            toggleVisibility('#products-container')
            const res = await updateProduct(product)
            const message = res.ok ? "Prodotto aggiornato correttamente" : `${res.statusText}`
            const type = res.ok ? "success" : "warning"
            showToast(message, type)
            toggleVisibility('#product-container')
            toggleVisibility('#products-container')
        } else {
            toggleVisibility('#product-container')
            toggleVisibility('#products-container')
            const res = await postProduct(product)
            const message = res.ok ? "Prodotto creato correttamente" : `${res.statusText}`
            const type = res.ok ? "success" : "warning"
            showToast(message, type)
            form.reset();
            form.classList.remove('was-validated');
            if (res.ok) {
                const newProducts = await getProducts()
                appendList(createList(newProducts))
            }
            toggleVisibility('#product-container')
            toggleVisibility('#products-container')
        }

    }

}

/*---- Function to create the products list template literal ----*/
const createList = (products) => {
    return `
        ${products.map(product=>createListItem(product)).join(' ')}        

        <a href="./backoffice.html?id=add"
            class="list-group-item product-list-item product-list-add-new d-flex justify-content-center align-items-center p-4 text-decoration-none">
            <div class="text-shop-green fs-5 fw-bold">
                <i class="bi bi-plus-circle me-2"></i> Aggiungi nuovo prodotto
            </div>
        </a>
    `
}

/*---- Function to create the single product list item template literal ----*/
const createListItem = (product) => {
    return `
    <div class="list-group-item product-list-item d-flex align-items-center p-3">
        <div class="d-flex align-items-center flex-grow-1">
            <img src="${product.imageUrl}" alt="${product.name}" class="product-thumbnail me-3">
            <div>
                <h6 class="product-name">${product.name}</h6>
                <span class="product-brand"><i
                    lass="bi bi-tag-fill me-1 text-muted"></i>${product.brand}</span>
            </div>
        </div>
        <div class="d-flex align-items-center gap-4">
            <span class="product-price">$${product.price}</span>
                <a href="./backoffice.html?id=${product["_id"]}" class="btn btn-edit btn-sm text-decoration-none">
                    <i class="bi bi-pencil-square me-1"></i> Modifica
                </a>
        </div>
    </div>
    `
}

/*---- Function to show the list in html ----*/
const appendList = (literal) => {
    document.getElementById('product-list').innerHTML = literal
}

/*---- Funtion to show toast messages ----*/
const showToast = (message, type) => {
    document.querySelector('.toast-container').innerHTML += `
        <div class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `

    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    })
    toastList.forEach(toast => toast.show())
}
/*---- Funtion to change visibility of a container ----*/
const toggleVisibility = (query) => {
    document.querySelector(query).classList.toggle('d-none')
}

/*---- Event Listner on the form submit event, to prevent the default action and the propagation ----*/
form.addEventListener('submit', (e) => {
    e.preventDefault()
    e.stopPropagation()
})

/*---- Event listner on "Vai giu" button ----*/
const goDown = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}


showPage()