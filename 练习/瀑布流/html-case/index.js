window.onload = () => {
  const waterFull = new WaterFull();
  waterFull.onLoad();

  window.onresize = debounce(() => {
    waterFull.onResize();
  }, 500);

  window.onscroll = debounce(() => {
    waterFull.onScroll();
  }, 500);

  // 做个防抖
  function debounce(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (!!timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }
};

// 模拟数据类
class Mock {
  //保存图片
  static _imgObjArr = [];

  // 读取 json 文件
  static async _getImgObjArrPromise() {
    let response = await fetch(`http://${window.location.host}/图片数据.json`);
    if (response.ok) {
      return await response.json();
    }
  }

  // 获取图片数据
  static async getCurrentImgObjPromise(index) {
    if (Mock._imgObjArr.length === 0) {
      await Mock._getImgObjArrPromise().then((res) => {
        Mock._imgObjArr = res;
      });
    }
    if (index <= Mock._imgObjArr.length - 1) {
      return Mock._imgObjArr[index];
    }
    return null;
  }
}

// 瀑布流类
class WaterFull {
  constructor() {
    //图片索引
    this._currentIndex = 0;
    this._waterfallBox = null;
    //已渲染
    this._wColDomObjArr = [];
    this._imgDomObjArr = [];
    //图片dom元素
    this._minWColDomObj = null;
    //行数
    this._row = 0;
    // onscroll 触发加载次数，初始为 1
    this._scrollNum = 1;
  }

  // 页面加载完成触发
  onLoad() {
    //获取容器dom
    this._waterfallBox = document.querySelector(".waterfall-box");
    this._setCol();
    this._showCards();
  }

  // 页面大小更改触发
  onResize() {
    this._setCol();
    this._showCards();
  }

  // 滚动条触底触发
  onScroll() {
    console.log(document.body.offsetHeight, document.body.scrollHeight);
    if (document.body.offsetHeight >= document.body.scrollHeight) {
      this._scrollNum++;
      this._showCards();
    }
  }

  // 渲染展示图片
  _showCards() {
    if (this._canDraw()) {
      if (!!this._imgDomObjArr[this._currentIndex]) {
        this._minWColDomObj.dh +=
          this._imgDomObjArr[this._currentIndex].obj.height;
        this._minWColDomObj.dom.appendChild(
          this._imgDomObjArr[this._currentIndex].dom
        );
        this._currentIndex++;
        this._showCards();
        return;
      }

      Mock.getCurrentImgObjPromise(this._currentIndex).then((imgObj) => {
        if (!imgObj) {
          return;
        }
        this._imgDomObjArr.push(this._getImgDomObj(imgObj));
        //往高度最小的那一列中渲染图片保证屏幕不留白
        this._minWColDomObj.dh += imgObj.height;
        this._minWColDomObj.dom.appendChild(
          this._imgDomObjArr[this._currentIndex].dom
        );
        this._currentIndex++;
        this._showCards();
      });
    }
  }

  // 是否还需渲染 card
  _canDraw() {
    this._minWColDomObj = this._wColDomObjArr.reduce((accumulator, item) => {
      return accumulator.dh <= item.dh ? accumulator : item;
    }, this._wColDomObjArr[0]);
    //目前已经加载展示的高度  判断高度最小的一列是否小于已经展示过的页面高度，小于就加载新的，否则会留白
    let h =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop;
    console.log(
      parseInt(this._minWColDomObj.dom.offsetHeight),
      parseInt(h)
    );
    if (
      parseInt(this._minWColDomObj.dom.offsetHeight) <
      parseInt(h)
    ) {
      return true;
    }
    return false;
  }

  // 设置列
  _setCol() {
    let newRow = this._getCol();
    if (this._row !== newRow) {
      this._waterfallBox.innerHTML = "";
      this._currentIndex = 0;
      this._row = newRow;
      this._wColDomObjArr = [];
      for (let i = 0; i < this._row; i++) {
        //保存生成的列节点，并初始化列属性
        this._wColDomObjArr[i] = this._getWColDomObj();
        //this._wColDomObjArr[i].height = 0;
        //将列加入瀑布流容器中
        this._waterfallBox.appendChild(this._wColDomObjArr[i].dom);
      }
    }
  }

  // 根据宽度计算获取列数
  _getCol() {
    //获取瀑布流容器宽度
    const w = this._waterfallBox.offsetWidth;
    if (w < 600) {
      return 2;
    } else if (w < 900) {
      return 4;
    } else if (w < 1200) {
      return 6;
    }
    return 8;
  }

  // 返回 wRowDomObj
  _getWColDomObj() {
    return {
      dom: this._getWFColDom(),
      dh: 0, //dom的高度
    };
  }

  // 返回 imgDomObj
  _getImgDomObj(imgObj) {
    //根据图片尺寸比例和列容器宽度计算imgDom的高度
    let h = parseInt(
      (imgObj.height / imgObj.width) * this._wColDomObjArr[0].dom.offsetWidth //获取列的宽度，这里每一列宽度都一样，随便取一个
    );
    imgObj.height = h;
    return {
      dom: this._getCardDom(imgObj.imgName, h),
      obj: imgObj,
    };
  }

  // 获取新建的 waterfallCol 节点
  _getWFColDom() {
    const wFRowDom = document.createElement("div");
    wFRowDom.classList.add("waterfall-row");
    return wFRowDom;
  }

  // 获取新建的 card 节点
  _getCardDom(imgName, height) {
    const card = document.createElement("div");
    const img = document.createElement("img");
    card.classList.add("card");
    card.style.height = `${height}px`;
    img.src = `./images/${imgName}`;
    img.alt = "";
    let colorNumArr = [];
    for (let i = 0; i < 3; i++) {
      colorNumArr.push(Math.floor(Math.random() * 255));
    }
    //生成随机背景颜色。
    img.style.backgroundColor = `rgb(${colorNumArr[0]},${colorNumArr[1]},${colorNumArr[2]})`;
    img.onload = () => {
      card.style.height = "auto";
    };
    card.appendChild(img);
    return card;
  }
}
