function uploadImage() {

    var formData = new FormData();
    var fileField = document.getElementById('snapname');

    var author = document.getElementById('snapauthor');
    var name = document.getElementById('snaptitle');
    var licence = document.getElementById('snaplicense');

    if (fileField.checkValidity() === false) {
        alert('You must provide a Snap! to upload');
        return;
    }
    if (author.checkValidity() === false) {
        alert('You must provide the author of this Snap!');
        return;
    }
    if (name.checkValidity() === false) {
        alert('You must provide a title for this Snap!')
        return;
    }
    if (licence.checkValidity() === false) {
        alert('You must provide a license number for this Snap!')
    }

    formData.append('metadata', new Blob([JSON.stringify({
        author: author.value,
        name: name.value,
        license: licence.value
    })], {type: 'application/json'}));

    formData.append('rawdata', fileField.files[0]);

    fetch(buildUrl(''), {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            alert('Snap! uploaded successfully!');
            location.reload();
        })
        .catch(function (err) {
            console.error('Request to vote the image up failed: ', err);
            alert('Snap! upload unsuccessful');
        });
}