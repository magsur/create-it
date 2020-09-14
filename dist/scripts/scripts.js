const websiteApp = document.getElementById('root');
let chunkedResponse = [];
let counter;

// source: https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-265.php
const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
        arr.slice(i * size, i * size + size));
}

fetch('https://itunes.apple.com/us/rss/topmovies/limit=100/json')
    .then(blob => blob.json())
    .then(response => {
        const entries = response.feed.entry;
        chunkedResponse = chunkArray(entries, 10);
        counter = 0;
        appendData();
    });

function appendData() {
    chunkedResponse[counter].map(chunk => {
        const card =
            `<div class="movie-card" id="${chunk['im:name'].label}">
                <div class="movie-image">
                    <img src="${chunk['im:image'][2].label}" />
                </div>
                <div class="movie-details">
                    <h1>${chunk['im:name'].label}</h1>
                    <div class="btn-wrapper">
                        <button type="button" class="btn" data-toggle="modal" data-target="#${chunk['id'].attributes['im:id']}">See more</button>
                        <div
                            class="heart-favorite"
                            onClick="addHeart(${chunk['id'].attributes['im:id']})"
                            id="${chunk['id'].attributes['im:id']}"
                        >❤</div>
                    </div>
                </div>
            </div>
            <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="movieModal" aria-hidden="true" id="${chunk['id'].attributes['im:id']}">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${chunk['im:name'].label}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           <p> ${chunk['summary'].label}</p>
                        </div>
                    </div>
                </div>
            </div> `;
        websiteApp.innerHTML += card;
    })
}

function addHeart(id) {
    $(`#${id}`).toggleClass('active');
}


$(window).scroll(function () {
    if (
        $(window).scrollTop() >= $(document).height() - $(window).height() - 300 && counter + 1 < chunkedResponse.length) {
        appendData();
        counter++;
    }
});
