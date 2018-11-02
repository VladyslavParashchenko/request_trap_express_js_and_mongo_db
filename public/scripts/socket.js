window.onload = function () {
    let socket = io(getRequestId());
    socket.on('newRequest', function (data) {
        let newRequest= document.createElement("pre");
        newRequest.innerHTML = data["request"];
        document.querySelector('.requests').appendChild(newRequest);
    });
}

function getRequestId(){
    let pathElements = window.location.pathname.split("/");
    pathElements.pop();
    return pathElements.join("/");
}
