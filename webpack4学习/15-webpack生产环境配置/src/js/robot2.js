import Vue from 'vue/dist/vue.esm';
import axios from 'axios'
import disu from '../img/addRobotImg/dipan/disu.png'
import gaosu from '../img/addRobotImg/dipan/gaosu.png'
import JSMpeg from 'jsmpeg-player'
import Highcharts from 'highcharts';
// eslint-disable-next-line
const app = new Vue({
  el: '#robot',
  data: {
    speed: 10,
    nowIndex: 0,
    btnIndex: 0,
    detectorList: [],
    robot: '',
    robotId: '',
    ultrasonicList: {},
    urlHead: 'http://192.168.1.102:8080',
    urlHeadNo: 'ws://192.168.1.102',
    navItem: ['视频'],
    slider: 20,//滑块的默认值
    speed: [
      {
        speedItem: '低速',
        img: disu,
        _img: gaosu
      },
      {
        speedItem: '中速',
        img: disu,
        _img: gaosu
      },
      {
        speedItem: '高速',
        img: disu,
        _img: gaosu
      }
    ],//速度控制按钮
    currentIndex: 0,//当前速度选择索引,
    slider: {//滑块参数
      front: 20,//前臂
      after: 40,//后臂
    },
    upPoleData: '',
    downPoleData: '',
    showPopup0: false,//弹窗显示
    showPopup1: false,//弹窗显示
    showPopup2: false,//弹窗显示
    showPopup3: false,//弹窗显示
    showPopup4: false,//弹窗显示
    showPopup5: false,//弹窗显示
    showPopup6: false,//弹窗显示
    popupNum: 0,//弹窗数量
    viewCurrentIndex: 0,
    player: null,//播放窗口对象
    viewList: [
      {
        mainId: 'v0',
        name: '前视图',
        ws: '8921'//端口号
      },
      {
        mainId: 'v1',
        name: '后视图',
        ws: '8922'
      },
      {
        mainId: 'v2',
        name: '左视图',
        ws: '8923'
      },
      {
        mainId: 'v3',
        name: '右视图',
        ws: '8924'
      },
      {
        mainId: 'v4',
        name: '上升降杆视图',
        ws: '8925'
      },
      {
        mainId: 'v5',
        name: '下升降杆视图',
        ws: '8926'
      },
      {
        mainId: 'v6',
        name: '抓斗杆视图',
        ws: '8927'
      },
    ],
    downNum: 0,//控制键盘按下连续触发
    EList: [],//能谱仪
    LEDFrontSwitch: false,
    LEDBackSwitch: false,//LED开关
    isBottomKey_W: false,//底盘按键点击事件
    isBottomKey_A: false,
    isBottomKey_S: false,
    isBottomKey_D: false,
    isBottomKey_Q: false,
    isBottomKey_E: false,
    isBottomKey_Z: false,
    isBottomKey_C: false,
    poImgKey_I: false,
    poImgKey_L: false,
    poImgKey_K: false,
    poImgKey_J: false,
    FAUP: false,
    FADOWN: false,
    BAUP: false,
    BADOWN: false,
    chart: null,
    v0: null,
    v1: null,
    v2: null,
    v3: null,
    v4: null,
    v5: null,
    v6: null,
    play0:null,
    play1:null,
    play2:null,
    play3:null,
    play4:null,
    play5:null,
    play6:null,
    player:null,
    preIndex:null,
    timer:10,
    avg:0
  },
  mounted() {
    this.$refs.front.value = this.slider.front;
    this.$refs.after.value = this.slider.after;
    this.init();
    this.videoInit();
    this.setChart();
  },
  methods: {
    init() {
      axios({
        method: 'post',
        url: this.urlHead + '/generator/robot/info/' + this.GetRequest()['rno'] + `?token=${this.getCookie('token')}`
      }).then(({ data }) => {
        this.robotId = data.robot.id;
        this.robot = data.robot
        document.title = data.robot.name
        //接收发送超声波,升降杆高度
        this.sendStartData('ULT', this.robotId).then(() => {
          this.sendStartData('ULT2', this.robotId).then(() => {
            setInterval(() => {
              this.getUData();
            }, 1000);
          })
        });
        this.sendStartData('LRF', this.robotId).then(() => {
          this.sendStartData('LRF2', this.robotId).then(() => {
            setInterval(() => {
              this.getLaserRangefinderHeight();
            }, 1000);
          })
        })
      }).then(() => {
        axios({
          method: 'post',
          url: this.urlHead + '/robot/robot/startcomm/' + this.robot.id + `?token=${this.getCookie('token')}`
        }).then(() => {
          this.getAllData(this.robot.id)
        })
      });

    },
    //发送下位机指令开始传感器
    sendStartData(code, robotId) {
      return axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/startSendData',
        params: {
          code: code,
          robotId: robotId,
        }
      })
    },
    // 发送数据
    sendData(code, robotId, speed) {
      axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/sendData',
        params: {
          code: code,
          robotId: robotId,
          speed: speed,
        }
      })
    },
    //发送停止指令
    sendStop(code, robotId) {
      axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/stop',
        params: {
          code: code,
          robotId: robotId,
        }
      })
    },
    //获取超声波
    getUData() {
      axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/getUData',
        params: {
          code: 'ULT',
          robotId: this.robotId,
        }
      }).then(res => {
        this.ultrasonicList = res.data.UList;
      });
    },
    //获取激光测距仪高度
    getLaserRangefinderHeight() {

      axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/getData',
        params: {
          code: 'LRF',
          robotId: this.robotId,
        }
      }).then(res => {
        this.upPoleData = res.data.data.val;
      });
      //测距
      axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/getData',
        params: {
          code: 'LRF2',
          robotId: this.robotId,
        }
      }).then(res => {
        this.downPoleData = res.data.data.val;
      })
    },
    //获取能谱仪数据
    getEdata() {
      axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/getEData/',
        params:{
          timer:+this.timer
        }
      }).then(res => {
        this.EList = res.data.EList;
        this.avg = res.data.avg;
      })
    },
    // 获取数据
    getAllData(rno) {
      if (rno) {
        axios({
          method: 'post',
          url: this.urlHead + '//robot/robot/getAllNoESpecialData/' + rno + `?token=${this.getCookie('token')}`
        }).then(({ data }) => {
          this.detectorList = data.list
        })
      }
    },
    GetRequest(urlStr) {
      if (typeof urlStr === 'undefined') {
        var url = decodeURI(location.search) // 获取url中"?"符后的字符串
      } else {
        var url = '?' + urlStr.split('?')[1]
      }
      var theRequest = new Object()
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        str = str.split('&')
        for (var i = 0; i < str.length; i++) {
          theRequest[str[i].split('=')[0]] = decodeURI(str[i].split('=')[1])
        }
      }
      return theRequest
    },
    getCookie(name) {
      let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      // eslint-disable-next-line no-cond-assign
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
      } else {
        return null
      }
    },
    // 关闭数据请求
    off(val) {
      this.detectorList.forEach(i => {
        if (i.id === val) {
          i.isOff = 1
          clearInterval(i.reqInterval)
          clearInterval(i.readInterval)
        }
      })
    },

    // 开启数据请求
    on(val, code, robotId) {
      let token = this.getCookie('token')
      let urlHead = this.urlHead
      this.detectorList.forEach(i => {
        if (i.id === val) {
          i.isOff = 0
          if (code === "D") {//如果选择的是剂量仪，就先发送连接请求再开启定时监控
            axios({
              method: 'post',
              url: urlHead + '/robot/robot/connect',
              params: {
                code: "DC",
                robotId: robotId,
                token: token,
              }
            }).then(() => {
              i.reqInterval = setInterval(function () {
                // 定时发送请求数据命令
                axios({
                  method: 'post',
                  url: urlHead + '/robot/robot/sendData/',
                  params: {
                    code: code,
                    robotId: robotId,
                    token: token
                  }
                })
              }, 1000)
              // 定时发送
              i.readInterval = setInterval(function () {
                // 发送读取数据命令
                axios({
                  method: 'post',
                  url: urlHead + '/robot/robot/getData/',
                  params: {
                    code: code,
                    robotId: robotId,
                    token: token
                  }
                }).then(({ data }) => {
                  i.val = data.data.val
                })
              }, 1000);
            });
          }
          else {
            i.reqInterval = setInterval(function () {
              // 定时发送请求数据命令
              axios({
                method: 'post',
                url: urlHead + '/robot/robot/sendData/',
                params: {
                  code: code,
                  robotId: robotId,
                  token: token
                }
              })
            }, 1000)
            // 定时发送
            i.readInterval = setInterval(function () {
              // 发送读取数据命令
              axios({
                method: 'post',
                url: urlHead + '/robot/robot/getData/',
                params: {
                  code: code,
                  robotId: robotId,
                  token: token
                }
              }).then(({ data }) => {
                i.val = data.data.val
              })
            }, 1000);
          }

        }
      })
    },
    isActive(index) {
      this.nowIndex = index
    },
    isStyle(index) {
      return {
        active: this.nowIndex === index
      }
    },
    _down(code) {
      this.sendData(code, this.robotId);
    },
    _up(index) {
      this.clickImg_1[index].cut = !0;
      this.armStop();
    },
    //滑块
    sliderInput(params) {
      this.slider[params] = +this.$refs[params].value

    },
    //选择速度
    selectSpeed(index) {
      this.currentIndex = index;
    },
    //视频初始化
    videoInit() {
        this.player = new JSMpeg.Player('ws://localhost:8921', {
          canvas: document.getElementById('main-video') // Canvas should be a canvas DOM element
        });
        console.log(this.player);
        this.player.play();
        this.player.getVolume();
        this.player.setVolume(1);
    },
    //右边监控视频选择
    chooseVideo(index) {
      this.player.stop();
      this.viewCurrentIndex = index;
      this.player = new JSMpeg.Player(this.urlHeadNo + ':' + this.viewList[index].ws, {
        canvas: document.getElementById('main-video') // Canvas should be a canvas DOM element
      });
      this.player.play();
      this.player.getVolume();
      this.player.setVolume(1);
    },
    LEDSwitch(flag, code) {
      if (flag) {
        this.sendData(code, this.robotId)
      } else {
        this.sendStop(code, this.robotId);
      }
    },
    //显示弹窗
    openPopup(e, index) {
      if(this['showPopup' + index]) {
        return;
      }
      this.popupNum++;
      console.log(this.popupNum);
      this['showPopup' + this.viewCurrentIndex] = true;
      //阻止事件冒泡
      this.player.stop();
      e.cancelBubble = true;
      this.$nextTick(() => {
        this.dragWindow(this.viewCurrentIndex);
        if(this['play' + this.viewCurrentIndex] === null) {
           this['play' + this.viewCurrentIndex] = new JSMpeg.Player(this.urlHeadNo + ':' + this.viewList[this.viewCurrentIndex].ws, {
          canvas: document.getElementById('popup-video' + this.viewCurrentIndex) // Canvas should be a canvas DOM element
        }) 
        }
        this['play' + this.viewCurrentIndex].play();
        this['play' + this.viewCurrentIndex].getVolume();
        this['play' + this.viewCurrentIndex].setVolume(1);
      });
    },
    //关闭弹窗
    closePopup(index) {
      this['play' + index].stop();
      this['showPopup' + index] = false;
      this.popupNum--;
      console.log(this.popupNum);
      if (this.popupNum === 0) {
        this.preIndex = null;
        this.player.play();
        this.player.getVolume();
        this.player.setVolume(1);
      }

    },
    //控制机械臂
    armMove(code, robotId) {
      if (code === 'FAUP' || code === 'FADOWN') {//判断是前臂还是后臂
        this.sendData(code, robotId, this.slider.front * 154);
      }
      else if (code === 'BAUP' || code === 'BADOWN') {
        this.sendData(code, robotId, this.slider.after * 154);
      }
      else {
        this.sendData(code, robotId, (this.currentIndex) * 1000 + 2000);//0 1 2 对应 2000 3000 4000
      }

    },
    armStop(code) {
      this.sendStop(code, this.robotId);
    },
    //窗口拖拽事件开始
    dragWindow(index) {
      const popup = document.querySelectorAll('.popup');
      this.drag(popup[index]);
    },
    drag(obj) {
      obj.onmousedown = function (event) {
        obj.setCapture && obj.setCapture();
        event = event || window.event;
        //div的偏移量 鼠标.clentX - 元素.offsetLeft
        //div的偏移量 鼠标.clentY - 元素.offsetTop
        var ol = event.clientX - obj.offsetLeft;
        var ot = event.clientY - obj.offsetTop;
        //为document绑定一个onmousemove事件
        document.onmousemove = function (event) {
          event = event || window.event;
          //当鼠标移动时被拖拽元素跟随鼠标移动 onmousemove
          //获取鼠标的坐标
          var left = event.clientX - ol;
          var top = event.clientY - ot;
          //修改box1的位置
          obj.style.left = left + "px";
          obj.style.top = top + "px";
        }

        //为document绑定一个鼠标松开事件
        document.onmouseup = function () {
          //当鼠标松开时，被拖拽元素固定在当前位置	onmouseup
          //取消document的onmousemove事件
          document.onmousemove = null;
          //取消document的onmouseup事件
          document.onmouseup = null;
          //当鼠标松开时，取消对事件的捕获
          obj.releaseCapture && obj.releaseCapture();
        }
        return false;
      }
    },
    setChart() {
      const that = this;
      this.chart = Highcharts.chart('myChart', {
        credits: {
          enabled: false
        },
        chart: {
          zoomType: 'x',
          backgroundColor: 'transparent',
          padding: 0,
          marginLeft: 60,
          marginBottom: 58,
          events: {
            load: function () {
              function requestData(n) {
                let arr = [],
                  i,
                  a,
                  b,
                  c,
                  spike;
                for (i = 0; i < n; i = i + 1) {
                  if (i % 100 === 0) {
                    a = 2 * Math.random();
                  }
                  if (i % 1000 === 0) {
                    b = 2 * Math.random();
                  }
                  if (i % 10000 === 0) {
                    c = 2 * Math.random();
                  }
                  if (i % 50000 === 0) {
                    spike = 10;
                  } else {
                    spike = 0;
                  }
                  arr.push([
                    i,
                    2   * Math.sin(i / 100) + a + b + c + spike + Math.random()
                  ]);
                }
                return arr;

              }
              let series = this.series[0]
              setInterval(() => {
                that.getEdata();
              series.setData(that.EList);
               //series.setData(requestData(4096));
              }, 1000);

            }
          }
        },
        boost: {
          useGPUTranslations: true
        },
        title: {
          text: '能谱仪',
          align: "left",
          style: {
            color: "#fff",
            fontSize: 13,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          valueDecimals: 0,
          backgroundColor: '#339cb9',
        },
        xAxis: {
          title: {
            text: null,
            style: {
              color: '#339cb9'
            }
          },
          labels: {
            style: {
              color: '#339cb9'
            }
          },
          Labels: true,
          tickColor: '#339cb9',
          lineColor: '#339cb9'
        },
        yAxis: {
          /* tickPositions: [0, 8, 16], */
          title: {
            text: null
          },
          labels: {
            style: {
              color: '#339cb9'
            }
          },
          Labels: true,
          gridLineWidth: 0,
          lineColor: '#339cb9',
          softMin: 8,
          min: 0
        },
        legend: {
          labelFormat: '能谱仪',
          itemStyle: {
            color: "#339cb9"
          },
          itemHoverStyle: {
            color: '#53B3D1'
          },
          itemHiddenStyle: {
            color: "#53B3D1"
          }
        },
        series: [{
          name: '道址计数',
          data: [],
          lineWidth: 0.5,
          color: '#339cb9'
        }]
      });
    }

  }
})
