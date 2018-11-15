window.onload = function () {
  let socket = io(getRequestId());
  socket.on('newRequest', function (data) {
    let container = document.createElement('div');
    container.className = 'my-card-container';
    container.insertAdjacentHTML('beforeend', data['request']);
    document.querySelector('.requests').appendChild(container);
  });
};

function getRequestId () {
  let pathElements = window.location.pathname.split('/');
  pathElements.pop();
  return pathElements.join('/');
}
