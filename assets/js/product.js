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
    apendProduct(product)
    console.log(product)
}
renderProduct()
const apendProduct = (product) => {
    document.body.innerHTML += product.name
}