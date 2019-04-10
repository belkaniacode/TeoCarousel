class TeoCarousel {

  constructor(Params) {
    this.Params = Params;
  }

  create() {

    const slider = document.querySelector("."+Params.class);
    const items_cnt = slider.firstElementChild;

    let item = items_cnt.firstElementChild;
    let item_arr = items_cnt.children;
    let item_w = item.clientWidth;
    let item_m = item.offsetLeft;
    let item_offsetLeft = [];

    slider.style.width = ((item_w + item_m * 2) * Params.items)+"px";

    let startX;
    let scrollLeft;
    let isDown = false;

    for (let i = 0; i < item_arr.length; i++) {
      item_offsetLeft.push(item_arr[i].offsetLeft);
    }

    const parkItem = (arr, search) => {
     let park = arr.find(it =>
         Math.abs(it - search) === Math.min(...arr.map(it =>
           Math.abs(it - search))
         ));

       slider.scrollTo({
           left: park -item_m,
           behavior: 'smooth'
       });
   };

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", (e) => {
      isDown = false;
       parkItem(item_offsetLeft, slider.scrollLeft);
    });

    slider.addEventListener("mouseup", (e) => {
      isDown = false;
       parkItem(item_offsetLeft, slider.scrollLeft);
    });

    slider.addEventListener("mousemove", (e) => {
      if(!isDown) return;
      e.preventDefault;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });


  }

}
