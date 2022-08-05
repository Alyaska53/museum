let original = document.querySelector(".explore_before");
let click = 0, slider;

function comp() {
  compare(original);
  
  function compare(img) {
    const width_image = img.offsetWidth;
    const height_image = img.offsetHeight;
      img.style.width = `${(width_image/2)+ 80}px`;
    slider = document.createElement("div");
    slider.classList.add('explore_slider');
    img.parentElement.insertBefore(slider, img);

    slider.style.top = `${(height_image / 2) - (slider.offsetHeight / 2)}px`;
    slider.style.left = `${(width_image / 2) - (slider.offsetWidth / 2) + 80}px`;

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      e.preventDefault();
      click = 1;
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    
    function slideFinish() {
      click = 0;
    }
    
    function slideMove(e) {
      let position;

      if (click == 0) return false;

      position = getCursorPos(e);

      if (position < 0) position = 0;

      if (position > width_image) position = width_image;
        slide(position);
    }

    function getCursorPos(e) {
      let a;
      let x = 0;
      e = (e.changedTouches) ? e.changedTouches[0] : e;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;

      return x;
    }

    function slide(x) {
      img.style.width = `${x}px`;
      slider.style.left = `${img.offsetWidth - (slider.offsetWidth / 2)}px`;
    }
  }
}

comp();