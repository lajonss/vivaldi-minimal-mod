function setupLayout() {
    var header = document.getElementById('header');
    var pageTitle = document.getElementById('pagetitle');
    var windowButtons = header.getElementsByClassName('window-buttongroup')[0];
    var menu = header.getElementsByClassName('vivaldi')[0];
    var toolbar = document.getElementById('main').children[0];
    var toolButtons = toolbar.children[1];
    var addressField = toolbar.children[2];
    var addressFieldInput = addressField.querySelector('input');
    var extensions = toolbar.children[3];

    function showAddress() {
	addressField.style.display = 'flex';
	pageTitle.style.display = 'none';
	addressFieldInput.focus();
    }
    
    menu.classList.add('button-toolbar');
    toolButtons.insertBefore(menu, toolButtons.firstChild)

    extensions.appendChild(windowButtons);

    addressField.style.display = 'none';
    toolbar.insertBefore(pageTitle, addressField);

    addressFieldInput.addEventListener('blur', function() {
	addressField.style.display = 'none';
	pageTitle.style.display = 'block';
    });

    addressFieldInput.addEventListener('focus', showAddress);
    pageTitle.addEventListener('click', showAddress);

    header.appendChild(toolbar);
}

window.addEventListener('load', function() {
    setTimeout(setupLayout, 100);
});

