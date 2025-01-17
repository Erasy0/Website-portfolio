
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// Config param
let countItem = items.length;
let itemActive = 0;

// Event next click
next.onclick = function() {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
}

// Event prev click
prev.onclick = function() {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
}

// Auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 15000)

function showSlider() {
    // Remove active class from old items
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    if(itemActiveOld) itemActiveOld.classList.remove('active');
    if(thumbnailActiveOld) thumbnailActiveOld.classList.remove('active');

    // Add active class to new items
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // Scroll the thumbnail container to the active item
    scrollToActiveThumbnail();

    // Reset slider and thumbnail if at the top
    if (itemActive === 0) {
        resetSlider();
    }

    // Clear auto run slider interval and restart it
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// Function to scroll the thumbnail container to the active item
function scrollToActiveThumbnail() {
    const thumbnailContainer = document.querySelector('.thumbnail');
    const activeThumbnail = thumbnails[itemActive];
    
    const containerTop = thumbnailContainer.scrollTop;
    const containerBottom = containerTop + thumbnailContainer.clientHeight;

    const itemTop = activeThumbnail.offsetTop;
    const itemBottom = itemTop + activeThumbnail.clientHeight;

    if (itemTop < containerTop) {
        // Scroll up to bring the active item to the top
        thumbnailContainer.scrollTop = itemTop;
    } else if (itemBottom > containerBottom) {
        // Scroll down to bring the active item to the bottom
        thumbnailContainer.scrollTop = itemBottom - thumbnailContainer.clientHeight;
    }
}

// Function to reset the slider and thumbnail
function resetSlider() {
    const thumbnailContainer = document.querySelector('.thumbnail');
    
    // Reset the slider to the first item
    itemActive = 0;
    items.forEach(item => item.classList.remove('active'));
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    items[0].classList.add('active');
    thumbnails[0].classList.add('active');
    
    // Reset thumbnail scroll position
    thumbnailContainer.scrollTop = 0;
}

// Click thumbnail event
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

document.addEventListener('DOMContentLoaded', (event) => {
    const thumbnailContainer = document.querySelector('.thumbnail');

    // Scroll event listener
    thumbnailContainer.addEventListener('scroll', () => {
        // Do nothing on scroll to prevent updating active state
    });
});

