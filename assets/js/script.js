/*=================== Swiper Object initialization ===================*/
const swiper = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: false,
    watchSlidesProgress: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 2.2,
            spaceBetween: 5,
            allowTouchMove: true,
        },

        768: {
            slidesPerView: 3.2,
            spaceBetween: 5,
            allowTouchMove: true,
        },
        1200: {
            slidesPerView: 4.2,
            spaceBetween: 5,
            allowTouchMove: false,
        },
        1400: {
            slidesPerView: 6.2,
            spaceBetween: 5,
            allowTouchMove: false,
        },
    },
});

const getProducts = async () => {

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
    }

}
const products = [
  {
    name: "Maglione a Collo Alto",
    description: "Morbido maglione a collo alto in misto cashmere, dal design essenziale e avvolgente per le giornate più fredde.",
    brand: "Winter Warmth",
    imageUrl: "https://media.istockphoto.com/id/1278802435/it/foto/colore-giallo-maglione-isolato-sul-bianco-abbigliamento-donna-alla-moda-abbigliamento-a-maglia.jpg?s=612x612&w=0&k=20&c=dswpJjdIMg0QAyuDeuRi7p9JMTKRrkdJq2Sa6x2NX1E=",
    price: 65.00
  },
  {
    name: "Piumino Leggero Smanicato",
    description: "Gilet imbottito idrorepellente, perfetto per le mezze stagioni o da indossare a strati sotto un cappotto.",
    brand: "Active Fit",
    imageUrl: "https://media.istockphoto.com/id/1464234522/it/foto/gilet-in-maglia-grigia-e-blusa-bianca.jpg?s=612x612&w=0&k=20&c=QhCBqwXOJNnRnmnnEXvqblm3UlktrjIfBphHdJP2rlM=",
    price: 45.50
  },
  {
    name: "Gonna di Jeans",
    description: "Minigonna in denim dal lavaggio chiaro con orlo sfilacciato, un classico intramontabile per un look casual.",
    brand: "Denim Co.",
    imageUrl: "https://media.istockphoto.com/id/1162100585/it/foto/gonna-in-denim-isolata.jpg?s=612x612&w=0&k=20&c=57IAujJE88Qca8w6Yy5OqWrxm_fl8IYvgYJ45SZGSVI=",
    price: 25.99
  },
  {
    name: "Pantaloni della Tuta Jogger",
    description: "Pantaloni sportivi affusolati in cotone felpato con coulisse in vita e polsini alle caviglie. Comodità assoluta.",
    brand: "Street Walk",
    imageUrl: "https://media.istockphoto.com/id/1224545469/it/foto/pantaloni-sportivi-verdi-da-primo-piano-pantaloni-della-tuta-jogging-per-uomini-isolati-su.jpg?s=612x612&w=0&k=20&c=s5DZP9M7gGk3mS3_pyC6O1nyHhRrT8l-OUJEfgpq_MU=",
    price: 32.90
  },
  {
    name: "Camicia a Quadri in Flanella",
    description: "Camicia stile lumberjack a quadri rossi e neri, realizzata in calda e spessa flanella di cotone.",
    brand: "Urban Style",
    imageUrl: "https://media.istockphoto.com/id/498852901/it/foto/camicia-scozzese-rosso.jpg?s=612x612&w=0&k=20&c=pGiEQSg9-03ZZd_zZvE-FMw2UZlbigSvvtNOk4AJkKE=",
    price: 38.00
  },
  {
    name: "Cardigan Lungo in Maglia",
    description: "Cardigan aperto oversize con lavorazione a trecce e comode tasche laterali. Ideale per rilassarsi in casa o uscire.",
    brand: "Elegance",
    imageUrl: "https://media.istockphoto.com/id/1340959863/it/foto/maglione-blu-isolato-su-bianco-maglione-casual-vintage-lavorato-a-maglia-cardigan-di-lana.jpg?s=612x612&w=0&k=20&c=8ZOT1bEefw1453gItJ4jTq_goECUq_X9okujMaAB5po=",
    price: 49.90
  },
  {
    name: "Vestito da Sera Nero",
    description: "Il classico 'little black dress'. Abito tubino senza maniche con scollo a V, elegante e versatile per ogni evento.",
    brand: "Classic Sartoria",
    imageUrl: "https://media.istockphoto.com/id/644521848/it/foto/abito-da-sera-nero-e-scarpe-su-sfondo-di-legno-concetto-di-moda-visualizzazione-superiore.jpg?s=612x612&w=0&k=20&c=6abOxNYFlsm1odjpJ8ZOK6I6IllwIFy-iCb0lS4MwIo=",
    price: 75.00
  },
  {
    name: "Stivaletti Chelsea in Pelle",
    description: "Stivaletti alla caviglia in vera pelle marrone con inserti elastici laterali per una calzata facile e comoda.",
    brand: "Essential Wear",
    imageUrl: "https://media.istockphoto.com/id/179134927/it/foto/zeppa-in-legno-in-pelle-bianca-stivaletti-alla-caviglia-con-chiusura-a-zip.jpg?s=612x612&w=0&k=20&c=IixxOPiJSeTq8q_ek7gC1UwnMFa01-sVl10nT3AE49I=",
    price: 95.00
  },
  {
    name: "Cappello di Lana a Costine",
    description: "Berretto invernale (beanie) in pura lana vergine, con risvolto regolabile. Disponibile in vari colori.",
    brand: "Nordic Vibe",
    imageUrl: "https://media.istockphoto.com/id/1962420153/it/foto/berretto-in-maglia-giallo-senape-isolato-su-bianco.jpg?s=612x612&w=0&k=20&c=6vg-z2UTzUSzriTELe8bCH1ecoLhBoYcqGKfwPmPhGc=",
    price: 18.50
  },
  {
    name: "Cintura Classica in Cuoio",
    description: "Cintura resistente in cuoio lavorato a mano con fibbia quadrata in metallo anticato. Adatta sia per jeans che pantaloni eleganti.",
    brand: "Essential Wear",
    imageUrl: "https://media.istockphoto.com/id/523818848/it/foto/cintura-in-pelle-marrone.jpg?s=612x612&w=0&k=20&c=kHbDUsF1evBEyvA26tZh71ekmowYWzR71daPY_5u2ZU=",
    price: 22.00
  }
];



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
const  renderProducts = async() =>{
    const products = await getProducts()
    console.log(products)
}
renderProducts()