class TeoCarousel {

  constructor(obj) {
    this.teoParams = obj;
  }

  create() {

    var container = document.getElementById(teoParams.id),
        itmesContaier = container.firstElementChild,
        itemBlock = itmesContaier.getElementsByClassName(teoParams.itemCnt),
        itemLength = itemBlock.length,
        itemMargin = itemBlock[0].offsetLeft * 2,
        itemWidth = itemBlock[0].clientWidth,
        left = 0,
        maxWidth = (itemWidth + itemMargin) * itemLength - (itemWidth + itemMargin) * teoParams.items,
        itemOffsetLeft = [],
        posx, posx1, control, ms, maxSlide,
        mousemove = false;

    itmesContaier.style.width = (itemWidth + itemMargin) * itemLength +"px";
    container.style.width = (itemWidth + itemMargin) * teoParams.items + "px";

    ms = itmesContaier.clientWidth - (itemWidth + itemMargin)  * teoParams.items;
    maxSlide = -ms;

    for (var i = 0; i < itemLength; i++) {
      itemOffsetLeft.push(-itemBlock[i].offsetLeft);
    }

    let scroll = (params) => itmesContaier.style.left = params+"px";

    document.getElementById("right").addEventListener('click', function() {

      if (left >= maxWidth) {
          left = 0;
      }
      else {
          left = left + (itemWidth + itemMargin);
      }

      scroll(-left);

    });

    document.getElementById("left").addEventListener('click',function() {

      if (left != 0) {
          left = left - (itemWidth + itemMargin);
      }
      else {
          left = maxWidth;
      }

      scroll(-left);

    });

    /*
    itmesContaier.addEventListener('touchstart', function(e) {

      e = e || window.event;
      posx = e.changedTouches[0].pageX;

    }, true);

    itmesContaier.addEventListener('touchmove', function(e) {

      e = e || window.event;
      posx1 = e.changedTouches[0].pageX;

      control = posx1 - posx;
      left = left + control / 2;

      if (left >= 0 ) {
          left = 0;
          scroll(left);
      }

      if (left < maxSlide) {
          left = maxSlide;
          scroll(maxSlide);
      }

      scroll(left);

    }, true);

    itmesContaier.addEventListener('touchend', function(e) {

      const arr = itemOffsetLeft;
      const searchNumber = left;

      const getNumber = (arr, number) =>

        arr.map(it => {
            const ch = (it >= 0 ? it : -it) + number;
            return {
              base: it,
              result: ch >= 0 ? ch : -ch
            };
          }).sort((a, b) => a.result - b.result)[0].base;

      scroll(getNumber(arr, searchNumber));


    }, true);
    */
    var rangeWidth;
    var rangeLeft;
    var scrollLeft;

    itmesContaier.addEventListener('mousedown', function(e) {

      mousemove = true;
      posx = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;


    });
    itmesContaier.addEventListener('mouseleave', function(e) {
        mousemove = false;
    });


    itmesContaier.addEventListener('mousemove', function(e) {

      if (!mousemove) return;

      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - posx) * 2;
      scroll(walk);
      container.scrollLeft = scrollLeft - walk;
    });

    itmesContaier.addEventListener('mouseup', function() {
      mousemove = false;
    });



  }

}
