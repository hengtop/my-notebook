




//下面小键盘移动测试
window.onload = function () {
  var box1 = document.getElementById("box1");
  //定义一个变量，来表示移动的速度
  var speed = 10;
  //创建一个变量表示方向
  //通过修改dir来影响移动的方向
  var dir = 0;
  //开启一个定时器，来控制div的移动
  setInterval(function () {
    /*
     * 37 左
     * 38 上
     * 39 右
     * 40 下
     */
    switch (dir) {
      case 37:
        //alert("向左"); left值减小
        box1.style.left = box1.offsetLeft - speed + "px";
        break;
      case 39:
        //alert("向右");
        box1.style.left = box1.offsetLeft + speed + "px";
        break;
      case 38:
        //alert("向上");
        box1.style.top = box1.offsetTop - speed + "px";
        break;
      case 40:
        //alert("向下");
        box1.style.top = box1.offsetTop + speed + "px";
        break;
    }
  }, 30);
  //为document绑定一个按键按下的事件
  document.onkeydown = function (event) {
    event = event || window.event;

    //当用户按了ctrl以后，速度加快
    if (event.ctrlKey) {
      speed = 500;
    }
    //松手了设置回来
    else {
      speed = 10;
    }

    //使dir等于按键的值
    dir = event.keyCode;
  };

  //当按键松开时，div不再移动
  document.onkeyup = function () {
    //设置方向为0
    dir = 0;
  };
  
  /* 表格 */
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: ["温度", "湿度", "仪器仪表温度", "仪器仪表电量", "方位角度", "辐射剂量"],
      datasets: [{
        label: '状态',
        data: ['32.8', 68, 65.8, 12.5, 12.5, 0.87],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  /* vue对象 */
  const app = new Vue({
    el: '#robot',
    data: {
      speed: 10,
      nowIndex: 0,
      btnIndex: 0,
      clickImg: [
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },],
      clickImg_1: [
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },],
      imgBtn: [
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },
        {
          cut: true,
        },
      ],
      staticList: [
        {
          name: '温度',
          icon: './img/icon/temperature.png',
          data: '38.2℃'
        },
        {
          name: '湿度',
          icon: './img/icon/dampness.png',
          data: '68%'
        },
        {
          name: '仪器仪表温度',
          icon: './img/icon/temperature.png',
          data: '65.8℃'
        },
        {
          name: '仪器仪表电量',
          icon: './img/icon/electricity.png',
          data: '12.5K'
        },
        {
          name: '方位角度',
          icon: './img/icon/positionAngle.png',
          data: '12.5米'
        },
        {
          name: '辐射剂量',
          icon: './img/icon/dosage.png',
          data: '0.87C'
        }
      ],
      navItem: [
        '定位',
        '视频',
        '数据表',
      ]
    },
    methods: {
      top() {
        var box1 = document.getElementById("box1");
        box1.style.top = box1.offsetTop - this.speed + "px";
      },
      right() {
        var box1 = document.getElementById("box1");
        box1.style.left = box1.offsetLeft + this.speed + "px";
      },
      bottom() {
        var box1 = document.getElementById("box1");
        box1.style.top = box1.offsetTop + this.speed + "px";
      },
      left() {
        var box1 = document.getElementById("box1");
        box1.style.left = box1.offsetLeft - this.speed + "px";
      },
      isActive(index) {
        console.log(index)
        this.nowIndex = index;
      },
      isStyle(index) {
        return { active: this.nowIndex == index }
      },
      down(index) {
        this.clickImg[index].cut = false;
      },
      up(index) {
        this.clickImg[index].cut = true;
      },
      _down(index) {
        this.clickImg_1[index].cut = false;
      },
      _up(index) {
        this.clickImg_1[index].cut = true;
      },
      btn(index) {
        this.imgBtn[index].cut = !this.imgBtn[index].cut;
      },
      add() {
        alert("加1")
      },
      sup() {
        alert("减1")
      },
      _add() {
        alert("加1")
      },
      _sup() {
        alert("减1")
      }

    },
  })
};
