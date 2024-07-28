(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function() {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function() {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
        $(".daily-carousel").owlCarousel({

        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 2000,  // Faster transition interval
        autoplayHoverPause: false,
        dots:true,
        smartSpeed: 500,
        mouseDrag: true,
        touchDrag: true,

        responsive: {
            0: {
                items: 1 // 1 item on small screens
            },
            600: {
                items: 1 // 1 item on medium screens
            },
            1000: {
                items: 1 // 1 item on large screens
            }
        }
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

     const readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const testimonialItem = this.closest('.testimonial-item');
            testimonialItem.classList.toggle('expanded');
            this.textContent = testimonialItem.classList.contains('expanded') ? 'Read Less' : 'Read More';
        });
    });
$(window).on('load', function() {
    // Hide all offers initially in both sections
    $('.offer-item').hide();

    // Get the current day of the week (0 - Sunday, 1 - Monday, etc.)
    var daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var today = new Date().getDay();
    var todayOfferId = '#offer-' + daysOfWeek[today];

    // Show the offer for today in both the regular section and the popup if they exist
    if ($(todayOfferId).length) {
        $(todayOfferId).show();
    }
    if ($(todayOfferId + '-popup').length) {
        $(todayOfferId + '-popup').show();
    }

    // Show the popup once the content is fully loaded
    $('#popup').fadeIn();
});

// Function to close the popup
window.closePopup = function() {
    $('#popup').fadeOut();
};

// Open the popup when the button is clicked (if you have a button for it)
$('#popupBtn').click(function() {
    $('#popup').fadeIn();
});
window.onload = function() {
    const accessToken = 'IGQWROZAmdhUWZAOakxUXzJxOW1CdWRpSjBZAejJOS0RPT1g2a09aZAWM3N3FsLU4tLWZAFTTd6Sl9CM2l0SnE2UWRpVDFUTnA2SzV3VXFPZAnRzcEJYN1Uybm5TWnBXQ0hoZAkdVNUZAuYkZAkU3hZARnY0Y1NvbldDYnNEazgZD';
    const userId = '8549440835070410';
    const limit = 50; // Increase the limit to fetch more posts initially

    const fetchInstagramFeed = () => {
        const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,children{media_url,media_type}&access_token=${accessToken}&limit=${limit}`;
        console.log('Fetching URL:', url); // Log the URL being fetched

        fetch(url)
            .then(response => {
                console.log('Response status:', response.status); // Log the status of the response
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(result => {
                console.log('Fetched data:', result); // Log the result to understand the structure
                displayInstagramFeed(result.data);
            })
            .catch(error => console.log('Error fetching Instagram posts:', error));
    };

    const displayInstagramFeed = (data) => {
        const feedContainer = document.getElementById('instagram-feed');

        if (!data || !Array.isArray(data)) {
            console.error("Invalid data format:", data);
            return;
        }

        let displayedCount = 0;

        data.forEach(post => {
            if (displayedCount >= 6) return;

            let mediaUrl = post.media_url;

            // Handle carousel album, only take the first photo
            if (post.media_type === "CAROUSEL_ALBUM" && post.children && Array.isArray(post.children.data)) {
                const firstChild = post.children.data.find(child => child.media_type !== "VIDEO");
                if (firstChild) {
                    mediaUrl = firstChild.media_url;
                }
            }

            // Skip video posts
            if (post.media_type === "VIDEO") return;

            const postLink = document.createElement('a');
            postLink.href = post.permalink;
            postLink.target = '_blank';

            const postImage = document.createElement('img');
            postImage.src = mediaUrl;
            postImage.alt = post.caption || '';
            postImage.className = 'instagram-post-image';

            postLink.appendChild(postImage);
            feedContainer.appendChild(postLink);
            displayedCount++;
        });
    };

    fetchInstagramFeed();
};





// Add a resize event to handle orientation change or resizing on mobile devices
$(window).resize(function() {
    // You can add code here to handle specific adjustments needed for mobile
});





})(jQuery);

