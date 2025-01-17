document.addEventListener('DOMContentLoaded', function() {
  // Get the element to animate
  var element = document.getElementById('figma-box');
  var elementHeight = element.clientHeight;

  // Listen for scroll event and call animate function
  document.querySelector('.container').addEventListener('scroll', animate);

  // Check if element is in view
  function inView() {
      // Get window height
      var windowHeight = window.innerHeight;
      // Get number of pixels that the document is scrolled
      var scrollY = document.querySelector('.container').scrollTop;

      // Get current scroll position (distance from the top of the page to the bottom of the current viewport)
      var scrollPosition = scrollY + windowHeight;
      // Get element position (distance from the top of the page to the bottom of the element)
      var elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;

      // Is scroll position greater than element position? (is element in view?)
      return scrollPosition > elementPosition;
  }

  // Animate element when it is in view
  function animate() {
      // Is element in view?
      if (inView()) {
          // Element is in view, add class to element
          element.classList.add('slide-in-elliptic-left-fwd-9');
      } else {
          // Element is out of view, remove class and force reflow to restart animation
          element.classList.remove('slide-in-elliptic-left-fwd-9');
          void element.offsetHeight; // Trigger reflow
      }
  }
});
