window.onload = () => {
  let waterfall;
  Mock.getCurrentImgObjPromise().then((res) => {
    waterfall = new Waterfall(res);
    waterfall.onLoad();
  });

  window.onresize = debounce(() => {
    waterfall.onResize();
  }, 500);

  window.onscroll = debounce(() => {
    waterfall.onScroll();
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
  static imgObjArr = [];

  // 读取 json 文件
  static async getImgObjArrPromise() {
    let response = await fetch(`http://${window.location.host}/src/imgs.json`);
    if (response.ok) {
      return await response.json();
    }
  }

  // 获取图片数据
  static async getCurrentImgObjPromise() {
    const res = await Mock.getImgObjArrPromise();
    return res;
  }
}

// 瀑布流类
class Waterfall {
  constructor(imgArr) {
    //图片数据
    this.imgArr = imgArr;
    //图片索引
    this.currentIndex = 0;
    this.waterfallBox = null;
    //所有列dom元素
    this.colDomArr = [];
    //所有图片
    this.imgDomArr = [];
    //所有列中高度最低的，滚动的时候最先出现看到底的那一列
    this.minHeightcolDom = null;
    //列数
    this.col = 0;
  }

  // 页面加载完成触发
  onLoad() {
    //获取容器dom
    this.waterfallBox = document.querySelector(".waterfall-box");
    //生成列
    this.setCol();
    //渲染每一个图片
    this.loop();
  }

  // 页面大小更改触发
  onResize() {
    this.setCol();
    this.loop();
  }

  // 滚动条触底触发
  onScroll() {
    //渲染图片
    this.loop();
  }

  loop() {
    //判断现在能不能渲染了
    if (this.isRender() && this.imgArr[this.currentIndex + 1]) {
      window.requestAnimationFrame(() => this.renderCards());
    }
  }

  // 渲染展示图片
  renderCards() {
    this.imgDomArr.push(this.getImgDomObj(this.imgArr[this.currentIndex]));
    this.minHeightcolDom.appendChild(this.imgDomArr[this.currentIndex]);
    this.currentIndex++;
    this.loop();
  }

  // 是否还需渲染 card
  isRender() {
    this.minHeightcolDom = this.colDomArr.reduce((accumulator, item) => {
      return accumulator.offsetHeight <= item.offsetHeight ? accumulator : item;
    }, this.colDomArr[0]);
    //目前已经加载展示的高度  判断高度最小的一列是否小于已经展示过的页面高度，小于就加载新的，否则会留白
    let h =
      document.documentElement.clientHeight +
      document.documentElement.scrollTop;
    if (parseInt(this.minHeightcolDom.offsetHeight) < parseInt(h) + 300) {
      return true;
    }
    return false;
  }

  // 设置列
  setCol() {
    let newRow = this.calcCol();
    if (this.col !== newRow) {
      this.waterfallBox.innerHTML = "";
      this.currentIndex = 0;
      this.col = newRow;
      this.colDomArr = [];
      for (let i = 0; i < this.col; i++) {
        //保存生成的列节点，并初始化列属性
        this.colDomArr[i] = this.getColDom();
        //this.colDomArr[i].height = 0;
        //将列加入瀑布流容器中
        this.waterfallBox.appendChild(this.colDomArr[i]);
      }
    }
  }

  // 根据宽度计算获取列数
  calcCol() {
    //获取瀑布流容器宽度
    const w = this.waterfallBox.offsetWidth;
    if (w < 600) {
      return 2;
    } else if (w < 900) {
      return 4;
    } else if (w < 1200) {
      return 6;
    }
    return 8;
  }

  // 返回 imgDomObj
  getImgDomObj(imgObj) {
    //根据图片尺寸比例和列容器宽度计算imgDom的高度
    let h = parseInt(
      (imgObj.height / imgObj.width) * this.colDomArr[0].offsetWidth //获取列的宽度，这里每一列宽度都一样，随便取一个
    );
    return this.getNewCardDom(imgObj.imgName, h);
  }

  // 获取新建的 waterfallCol 节点
  getColDom() {
    const colDom = document.createElement("div");
    colDom.classList.add("waterfall-row");
    return colDom;
  }

  // 获取新建的 card 节点
  getNewCardDom(imgName, height) {
    const card = document.createElement("div");
    const img = document.createElement("img");
    card.classList.add("card");
    card.style.height = `${height}px`;
    img.src = `./src/images/${imgName}`;
    img.alt = "";
    let colorNumArr = [];
    for (let i = 0; i < 3; i++) {
      colorNumArr.push(Math.floor(Math.random() * 255));
    }
    //生成随机背景颜色。
    img.style.backgroundColor = `rgb(${colorNumArr[0]},${colorNumArr[1]},${colorNumArr[2]})`;
    //图片加载完毕后根据实际情况展示尺寸
    img.onload = () => {
      card.style.height = "auto";
    };

    card.appendChild(img);
    return card;
  }
}
