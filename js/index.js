function LoadDocument() {
    const result = document.querySelector('#result')
    const form = document.querySelector('#form')
    const pagination = document.querySelector('#pagination')
    const forPages = 40;
    let iterator;
    let totalPages;
    let currentPage = 1;
    form.addEventListener('submit', Validation)


    function Validation(e) {
        e.preventDefault()
        const picture = document.querySelector('#picture').value
        if (picture === '') {
            showAlert('Field is mandatory')
            return;
        }

        searchImages();

    }

    async function searchImages() {
        const picture = document.querySelector('#picture').value
        const key = '47537983-620888dcce1c9d0d135ffeafe';
        const url = `https://pixabay.com/api/?key=${key}&q=${picture}&per_page=${forPages}&page=${currentPage}`;

        try{
            const answer = await fetch(url);
            const result = await answer.json();
            totalPages = calculatePages(result.totalHits)
            showImages(result.hits)
        }
        catch(error){
            console.log(error)
        }
        
    }

    function showImages(images) {
        while (result.firstChild) {
            result.removeChild(result.firstChild)
        }
        if(images.length === 0 ){
            showAlert("Results not found")
        }
        images.forEach(image => {
            const { id, likes, views, largeImageURL, previewURL } = image
            result.innerHTML +=
                `
                <div class= "w-full md:w-1/2 lg:w-1/4 p-3 mb-4">
                <div class ="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4">
                    <p class="font-bold">${likes} <span class="font-light">Likes</span></p>
                    <p class="font-bold">${views} <span class="font-light">Views</span></p>
                    
                    <a class=" block w-full bg-blue-500 hover:bg-blue-400 text-white uppercase font-bold text-center rounded mt-5 p-1"
                    href="${largeImageURL}" target="_blank" rel= "noopener noreferrer">
                        Full Image
                    </a>
                    </div>
                </div>
            </div>
            `
        });
        while (pagination.firstChild) {
            pagination.removeChild(pagination.firstChild)
        }
        showPaginator();
    }

    function showAlert(messege){
        const currentAlert = document.querySelector('.bg-red-100')
    if(!currentAlert){
        const alert = document.createElement('p');
        alert.className = ('bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center')
        alert.innerHTML = `
            <strong class='font-bold'>Error!</strong>
            <span class='block sm:inline'>${messege}</span>
        `
        form.appendChild(alert)
        setTimeout(() => {
            alert.remove()
        }, 3000);
    }
    }


    function* generator(total) {
        for (let i = 1; i <= total; i++) {
            yield i;
        }
    }

    function showPaginator() {
        iterator = generator(totalPages)
        while (true) {
            const { value, done } = iterator.next()
            if (done) return;

            const botton = document.createElement('a');
            botton.href = '#';
            botton.dataset.pagina = value;
            botton.textContent = value;
            botton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded')
            botton.onclick = () => {
                currentPage = value
                searchImages()
            }

            pagination.appendChild(botton)
        }
    }

    function calculatePages(total){
        return parseInt(Math.ceil(total/forPages))
    }
}


document.addEventListener('DOMContentLoaded', LoadDocument)