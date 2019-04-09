class TeoCarousel {

  constructor(obj) {
    this.Params = obj;
  }

  create() {

    const slider = document.querySelector('.' + Params.class);

    let item_arr = slider.children;
    let item_w = slider.firstElementChild.clientWidth;
    let item_m = slider.firstElementChild.offsetLeft;
    let item_offsetL = [];

    slider.style.width = (item_w + (item_m * 2)) * Params.items + "px";

    let isDown = false;
    let startX;
    let scrollLeft;

    for (let i = 0; i < item_arr.length; i++) {
      item_offsetL.push(item_arr[i].offsetLeft);
    }

    const parkItem = (arr, search) => {
      let park = arr.find(it =>
          Math.abs(it - search) === Math.min(...arr.map(it =>
            Math.abs(it - search))
          ));
      slider.scrollLeft = park - item_m;
    };

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', (e) => {
      isDown = false;
      parkItem(item_offsetL, slider.scrollLeft);
    });

    slider.addEventListener('mouseup', (e) => {
      isDown = false;
      parkItem(item_offsetL, slider.scrollLeft);

    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });

  }

}
