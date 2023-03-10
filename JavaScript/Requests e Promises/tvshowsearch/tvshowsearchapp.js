const form = document.querySelector("#searchForm")
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    searchTerm = form.elements.query.value
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    console.log(res.data)
    makeImages(res.data)
})

const makeImages = (shows) => {
    for (result of shows) {
        if (result.show.image) {
            const img = document.createElement("img")
            img.src = result.show.image.medium
            document.body.append(img)
        }
    }
}