class TeoCarousel {

  constructor(Params) {
    this.Params = Params;
  }

  create() {

    const genCont = document.querySelector("."+Params.class);
    const arrowsCont = genCont.querySelector('.arrows');
    const slider = genCont.firstElementChild;
    const items_cnt = slider.firstElementChild;
    const arrowLeft =  arrowsCont.querySelector('.left-arrow');
    const arrowRight = arrowsCont.querySelector('.right-arrow');
    const item = items_cnt.firstElementChild;
    const item_arr = items_cnt.children;
    const item_w = item.clientWidth;
    const item_m = item.offsetLeft;

    let isArrows = Params.arrows;
    let item_offsetLeft = [];
    let park = item_m;

    for (let i = 0; i < item_arr.length; i++) {
      item_offsetLeft.push(item_arr[i].offsetLeft);
    }

    let items;
    let parkCount;

    let responsive = (_w) => {
      if (_w > 980)   items = Params.items;
      if (_w <= 980)  items = Params.items_980;
      if (_w <= 640) {
        items = Params.items_640;
        if (Params.hide_arrows_640) isArrows = false;
      }
      if (_w <= 580)  items = Params.items_580;

      slider.style.width = ((item_w + item_m * 2) * items)+"px";
      parkCount = item_offsetLeft.length - items;
    }

    responsive(window.innerWidth);

    window.addEventListener('resize', () => {
      responsive(window.innerWidth);
    });

    let parkItem = (arr, search) => {
      park = arr.find(it =>
         Math.abs(it - search) === Math.min(...arr.map(it =>
           Math.abs(it - search))
         ));

       slider.scrollTo({
           left: park -item_m,
           behavior: 'smooth'
       });
   };

   /*Mouse Event*/

   let startX;
   let scrollLeft;
   let isDown = false;

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

    /*Arrows*/

    if (isArrows) {

      arrowsCont.style.display = "block";

      arrowLeft.addEventListener('click', () => {
        let parkPos = (park + item_m) - item_w;
        if (park === item_offsetLeft[0])
            parkPos = item_offsetLeft[parkCount];
        parkItem(item_offsetLeft,  parkPos);
      });

      arrowRight.addEventListener('click', () => {
        let parkPos;
        if (park === item_offsetLeft[parkCount]) {
            parkPos = item_offsetLeft[0];
        } else {
            parkPos = (park + item_m) + item_w;
        }
        parkItem(item_offsetLeft,  parkPos);
      });

    }




  }

}
