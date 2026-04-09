const params = new URLSearchParams(window.location.search)
const id = params.get('id')
console.log(id)

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
    }
}

const renderProduct = async() =>{
    const product = await getProduct()
    appendProduct(generateProductCard(product))
    console.log(product)
}

const generateProductCard = (product) =>{
    return `
        <div class="row gx-5 align-items-center">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <div class="main-image-container relative">
                        <img src="${product.imageUrl}" class="img-fluid"
                            alt="${product.name}" style="max-height: 500px;">
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="d-flex justify-content-end mb-2">
                        <a href="/backoffice/edit-product/123"
                            class="btn btn-outline-secondary btn-sm btn-admin-edit shadow-sm">
                            <i class="fa-solid fa-pencil"></i> Modifica
                        </a>
                    </div>

                    <h1 class="product-title mb-1">${product.name}</h1>
                    <p class="text-muted fs-5 mb-3">A simple subtutle description</p>

                    <div class="d-flex align-items-center mb-4">
                        <div class="star-rating me-2">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <span class="text-muted">(121 Reviews)</span>
                    </div>
                    <div class="product-price mb-4">$${product.price} </div>
                    <p class="mb-4 text-secondary lh-lg"> ${product.description} </p>
                    <hr class="my-4 text-muted">
                    <div class="d-flex align-items-center gap-3 mt-4">
                        <input type="number" class="form-control quantity-input form-control-lg" value="1" min="1">
                        <button class="btn btn-add-cart btn-lg flex-grow-1 flex-md-grow-0">
                            <i class="fa-solid fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                    <div class="mt-4 pt-3 border-top text-muted small">
                        <p class="mb-1"><i class="fa-regular fa-truck text-warning"></i> Spedizione gratuita e resi garantiti entro 30
                            giorni.</p>
                        <p class="mb-0"><i class="fa-solid fa-shield text-warning"></i> 2 anni di garanzia inclusi.</p>
                    </div>
                </div>
            </div>
    `
}
renderProduct()
const appendProduct = (literal) => {
    document.getElementById('product-container').innerHTML = literal
}