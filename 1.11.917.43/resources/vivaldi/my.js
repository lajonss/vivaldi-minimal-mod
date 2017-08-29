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
    var pageTitleButton = createPageTitleButton();
    var bookmarkContainer = addressField.querySelector('.add-bookmark-container');

    function createPageTitleButton() {
	var button = document.createElement('button');
	button.classList.add('pagetitle');
	button.classList.add('button-toolbar');
	return button;
    }
    
    function showAddress() {
	addressField.style.display = 'flex';
	pageTitleButton.style.display = 'none';
	addressFieldInput.focus();
    }

    function hideAddress() {
	addressField.style.display = 'none';
	pageTitleButton.style.display = 'block';
    }

    function discoverNewTab(tabCreatedEvent) {
	if(tabCreatedEvent.active)
	    showAddress();
    }

    function setupDynamicAddressBar() {
	addressField.style.display = 'none';
	
	addressFieldInput.addEventListener('blur', hideAddress);
	addressFieldInput.addEventListener('focus', showAddress);
	pageTitleButton.addEventListener('click', showAddress);
    }

    function setupMenuButton() {
	menu.classList.add('button-toolbar');
	toolButtons.insertBefore(menu, toolButtons.firstChild)
    }

    function setupPageTitle() {
	toolbar.insertBefore(pageTitleButton, addressField);
	pageTitleButton.appendChild(pageTitle);
    }

    function setupBookmarkButton() {
	var span = document.createElement('span');
	span.classList.add('bookmark-container-span');
	extensions.insertBefore(span, extensions.firstChild);
	span.appendChild(bookmarkContainer);
    }

    setupMenuButton();
    extensions.appendChild(windowButtons);
    setupPageTitle();
    //setupBookmarkButton();
    setupDynamicAddressBar();
    header.appendChild(toolbar);
    chrome.tabs.onCreated.addListener(discoverNewTab);
}

window.addEventListener('load', function() {
    setTimeout(setupLayout, 100);
});
