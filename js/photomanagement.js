function loadAllImages() {
    fetch(buildUrl(''))
        .then(function (response) {
            if (response.status !== 200) {
                throw new Error('Request return status code !== 200: ' + response.status + ' - ')
            }
            return response.json();
        })
        .then(function (json) {
            console.log('Request to view images succeeded: ');
            console.log(json);

            var jsonLength = json.length;
            for (var i = 0; i < jsonLength; i++) {
                var currentImage = json[i];
                $('#images-table').append(
                    `
                        <tr>
                            <td class="imagetableheader"><img src="data:image/png;base64, ${currentImage.thumbnail}"</td>
                            <td class="imagetableheader">${currentImage.author}</td>
                            <td class="imagetableheader">${currentImage.name}</td>
                            <td class="imagetableheader">${currentImage.license}</td>
                            <td class="imagetableheader"><button class="deletebutton" onclick="deleteImage(${json[i].id})">Delete</button></td>
                        </tr>
                    `
                );
            }

        })

        .catch(function (err) {
            console.error('Request to view images failed: ', err);
        });
}

function deleteImage(photoId) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    fetch(buildUrl('/id/' + photoId), {method: 'delete', headers: new Headers({'Authorization': `Basic ${btoa(`${username}:${password}`)}`})})
        .then(function (response) {
            if (response.status === 401) {
                alert('You are not authorized to delete Snaps!');
                return;
            }
            if (response.status !== 204) {
                throw new Error('Request return status code !== 204: ' + response.status + ' - ')
            }
            location.reload();
        })
        .catch(function (err) {
            console.error('Request to remove the image failed: ', err);
        })
}

$(function() {
    loadAllImages();
});