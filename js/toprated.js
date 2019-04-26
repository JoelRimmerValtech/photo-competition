function loadTopImage() {
    fetch(buildUrl('/top'))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function (json) {
            console.log('Request to /top succeeded: ');
            console.log(json);

            var mainImage = $('#top-image');
            mainImage.attr('src', json.url);
            mainImage.attr('alt', 'Photo Competition image, ' + json.name);

            var author = $('#author');
            author.text(json.author);

            var name = $('#name');
            name.text(json.name);

            var license = $('#license');
            license.text(json.license);

        })
        .catch(function (err) {
            console.error('Request to /random failed: ', err);
        });
}

$(function () {
    loadTopImage();
});