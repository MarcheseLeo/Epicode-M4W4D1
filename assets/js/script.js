/*=================== Swiper Object initialization ===================*/
let swiper 

const initializeSwiper = () =>{
    swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: false,
    watchSlidesProgress: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 2.2,
            spaceBetween: 15,
            allowTouchMove: true,
        },

        768: {
            slidesPerView: 3.2,
            spaceBetween: 15,
            allowTouchMove: true,
        },
        1200: {
            slidesPerView: 4.2,
            spaceBetween: 15,
            allowTouchMove: false,
        },
        1400: {
            slidesPerView: 6.2,
            spaceBetween: 15,
            allowTouchMove: false,
        },
    },
});

}

const spinner = document.getElementById('spinner')

const getProducts = async () => {
    spinner.classList.remove('d-none')
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2NjE3MjUzMjU4OTAwMTU2MjAyOWEiLCJpYXQiOjE3NzU2NTczMzAsImV4cCI6MTc3Njg2NjkzMH0.x-mlS1DWyjCTZ_w0ag9o0wRFK4jK4D0tVzc6sMhXA0Q",
            }
        })
        if (!response.ok)
            throw new Error(`Response status: ${response.status}`)
        return await response.json()
    } catch (e) {
        console.error(e)
    } finally {

        spinner.classList.add('d-none')

    }

}


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
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

const updateProduct = async (product, id) => {
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
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

const renderProducts = async () => {
    const products = await getProducts()
    console.log(products)
    const random = products.sort(() => Math.random() - 0.5)
    initializeSwiper()
    changeVisibility('#products-container')
    const str = products.reduce((acc, product) => {
        acc += createCard(product)
        return acc
    }, ``)


    console.log(random)
    appendCards(str)
}

const createCard = (product) => {
    return `
        <div class="swiper-slide">
            <div class="card product-card h-100 bg-transparent">    
                <div class="img-container">
                    <button class="wishlist-btn" onclick="addToSaved(this)"><i class="fa-regular fa-heart"></i></button>
                    <a href="./product.html?id=${product["_id"]}">
                        <img src="${product.imageUrl}" class="" alt="">
                    </a>
                </div>

                <div class="card-body px-0">
                    <a href="./product.html?id=${product["_id"]}">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title text-truncate fw-bold mb-0">${product.name}</h5>
                            <span class="price">$${product.price}</span>
                        </div>
                        <p class="card-text text-muted text-truncate small mb-2">${product.description}</p>
                    </a>
                    <div class="mb-3">
                        <span class="star-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </span>
                        <span class="reviews-count ms-1">(121)</span>
                    </div>

                    <button class="btn btn-add-cart" onclick=addToCart(this)>Add to Cart</button>
                </div>
            </div>
        </div>
    `
}

const appendCards = (htmlStr) => {
    document.querySelector('#products-container .swiper-wrapper').innerHTML = htmlStr
}

const addToSaved = (node) =>{
    const icon = node.children[0]
    icon.classList.toggle('saved')
    icon.classList.toggle('fa-regular')
    icon.classList.toggle('fa-solid')
    console.log(icon.classList)
}
const addToCart = (node) =>{
    node.classList.toggle('added')
    node.textContent = node.classList.contains('added') ? 'Added' : 'Add to Cart'
}

const changeVisibility = (query) => {
    document.querySelector(query).classList.toggle('d-none')
}
renderProducts()