import Vue from 'vue/dist/vue.esm';
import axios from 'axios'
import disu from '../img/addRobotImg/dipan/disu.png'
import gaosu from '../img/addRobotImg/dipan/gaosu.png'
import JSMpeg from 'jsmpeg-player'



// eslint-disable-next-line
const app = new Vue({
  el: '#robot',
  data: {
    nowIndex: 0,
    btnIndex: 0,
    detectorList: [],
    robot: {},
    robotId: '',
    // 超声波1号站
    u1: {
      id: 20,
      val: '',

    },
    // 超声波2号站
    u2: {
      id: 21,
      val: '',

    },
    // 超声波3号站
    u3: {
      id: 22,
      val: '',

    },
    // 超声波4号站
    u4: {
      id: 23,
      val: '',

    },
    u5: {
      id: 24,
      val: '',

    },
    urlHead: 'http://192.168.1.5:8080',
    navItem: ['视频', '数据表'],
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
    viewList: [
      {
        id: 'video-item-1',
        mainId: 'main1',
        name: '前视图',
        ws: "ws://192.168.1.5:8910",
        active: true
      },
      {
        id: 'video-item-2',
        mainId: 'main2',
        name: '后视图',
        ws: "ws://192.168.1.5:8911",
        active: false
      },
      {
        id: 'video-item-3',
        mainId: 'main3',
        name: '辐射视图',
        ws: "ws://192.168.1.5:8912",
        active: false
      }
    ],
    downNum: 0,//控制键盘按下连续触发
    LEDswitch: false,//LED开关
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
    player: {},//主视频
    'video-item-1': {},//右侧视频
    'video-item-2': {},
    'video-item-3': {},
  },
  mounted() {
    window.addEventListener('keyup', this.handleKeyup);//监听键盘事件
    window.addEventListener('keydown', this.handleKeydown)
    this.$refs.front.value = this.slider.front;
    this.$refs.after.value = this.slider.after;//初始化滑块的位置

    this.init();
    this.videoInit();
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
        //接收发送超声波
        axios({
          method: 'post',
          url: app.urlHead + '/robot/robot/startU/' + `?token=${app.getCookie('token')}`,
          params: {
            robotId: this.robotId,
          }
        }).then(() => {
          for (let i = 1; i <= 5; i++) {
            this.sendUltrasonic('U' + i, this.robotId, i);
          }
        });


      }).then(() => {
        axios({
          method: 'post',
          url: this.urlHead + '/robot/robot/startcomm/' + this.robot.id + `?token=${this.getCookie('token')}`
        }).then(() => {
          this.getAllData(this.robot.id)
        })
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
    //定时收发超声波信息
    sendUltrasonic(code, robotId, index) {
      setInterval(function () {
        // 发送读取数据命令
        axios({
          method: 'post',
          url: app.urlHead + '/robot/robot/getData/' + `?token=${app.getCookie('token')}`,
          params: {
            code: code,
            robotId: robotId,
          }
        }).then(({ data }) => {
          app['u' + index].val = data.data.val
        })
      }, 1000);
    },
    //初始化
    videoInit() {
      this.viewList.map((item) => {
        this[item.mainId] = new JSMpeg.Player(item.ws, {
          canvas: document.getElementById(item.mainId) // Canvas should be a canvas DOM element
        })
        this[item.mainId].play();
        this[item.id] = new JSMpeg.Player(item.ws, {
          canvas: document.getElementById(item.id) // Canvas should be a canvas DOM element
        })
        this[item.id].play()
      });
    },
    //切换视频展示
    changeVideo(id) {
      this.viewList.map((item) => {
        if (item.id === id) {
          item.active = true;
        } else if (item.active === true) {
          item.active = false;
        }
      })
    },

    //滑块
    sliderInput(params) {
      this.slider[params] = +this.$refs[params].value
    },
    //选择速度
    selectSpeed(index) {
      this.currentIndex = index;
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
    armStop() {
      this.sendData('STOP', this.robotId);
    },
    //组合键盘事件
    handleKeyup(event) {
      const e = event || window.event || arguments.callee.caller.arguments[0]
      if (!e) return
      const { key, keyCode } = e
      this.downNum = 0;
      switch (keyCode) {
        case 79://LDE灯
          this.sendData('Spotlight', this.robotId);
          this.LEDswitch = !this.LEDswitch
          break;
        case 49://底盘低速
          this.currentIndex = 0;
          break;
        case 50://底盘中速
          this.currentIndex = 1;
          break;
        case 51://底盘高速
          this.currentIndex = 2;
          break;
        case 87://底盘上
          this.isBottomKey_W = false;
          this.armStop();
          break;
        case 65://底盘左
          this.isBottomKey_A = false;
          this.armStop();
          break;
        case 83://底盘下
          this.isBottomKey_S = false;
          this.armStop();
          break;
        case 68://底盘右
          this.isBottomKey_D = false;
          this.armStop();
          break;
        case 81://底盘左上
          this.isBottomKey_Q = false;
          this.armStop();
          break;
        case 69://底盘右上
          this.isBottomKey_E = false;
          this.armStop();
          break;
        case 90://底盘左下
          this.isBottomKey_Z = false;
          this.armStop();
          break;
        case 67://底盘右下
          this.isBottomKey_C = false;
          this.armStop();
          break;
        case 73://云台上
          this.poImgKey_I = false;
          this.armStop();
          break;
        case 75://云台下
          this.poImgKey_K = false;
          this.armStop();
          break;
        case 74://云台左
          this.poImgKey_J = false;
          this.armStop();
          break;
        case 76://云台右
          this.poImgKey_L = false;
          this.armStop();
          break;
        case 52://焦距+
          this.sendData('STOP', this.robotId);
          break;
        case 53://焦距-
          this.sendData('STOP', this.robotId);
          break;
        case 54://光圈+
          this.sendData('STOP', this.robotId);
          break;
        case 55://光圈-
          this.sendData('STOP', this.robotId);
          break;
        case 56://远近+
          this.sendData('STOP', this.robotId);
          break;
        case 57://远近-
          this.sendData('STOP', this.robotId);
          break;
        case 48://亮度+
          this.sendData('STOP', this.robotId);
          break;
        case 45://亮度-
          this.sendData('STOP', this.robotId);
          break;
        case 86://前臂上升
          this.FAUP = false;
          this.sendData('STOP', this.robotId);
          break;
        case 66://前臂下降
          this.FADOWN = false;
          this.sendData('STOP', this.robotId);
          break;
        case 78://后臂上升
          this.BAUP = false;
          this.sendData('STOP', this.robotId);
          break;
        case 77://后臂下降
          this.BADOWN = false;
          this.sendData('STOP', this.robotId);
          break;
      }
    },
    handleKeydown(event) {
      if (this.downNum) {
        return;
      }
      else {
        this.downNum++;
        const e = event || window.event || arguments.callee.caller.arguments[0]
        if (!e) return
        const { key, keyCode } = e
        switch (keyCode) {
          case 87://底盘上
            this.isBottomKey_W = true;
            this.armMove('FORWARD', this.robotId);
            break;
          case 65://底盘左
            this.isBottomKey_A = true;
            this.armMove('IPL', this.robotId);
            break;
          case 83://底盘下
            this.isBottomKey_S = true;
            this.armMove('BACKWARD', this.robotId);
            break;
          case 68://底盘右
            this.isBottomKey_D = true;
            this.armMove('IPR', this.robotId);
            break;
          case 81://底盘左上
            this.isBottomKey_Q = true;
            this.armMove('FORWARD_LEFT', this.robotId);
            break;
          case 69://底盘右上
            this.isBottomKey_E = true;
            this.armMove('FORWARD_RIGHT', this.robotId);
            break;
          case 90://底盘左下
            this.isBottomKey_Z = true;
            this.armMove('BACKWARD_LEFT', this.robotId);
            break;
          case 67://底盘右下
            this.isBottomKey_C = true;
            this.armMove('BACKWARD_RIGHT', this.robotId);
            break;
          case 73://云台上
            this.poImgKey_I = true;
            this._down('PTZ_UP');
            break;
          case 75://云台下
            this.poImgKey_K = true;
            this._down('PTZ_DOWN');
            break;
          case 74://云台左
            this.poImgKey_J = true;
            this._down('PTZ_LEFT');
            break;
          case 76://云台右
            this.poImgKey_L = true;
            this._down('PTZ_RIGHT');
            break;
          case 52://焦距+
            this.sendData('PTZ_FOCUSES+', this.robotId);
            break;
          case 53://焦距-
            this.sendData('PTZ_FOCUSES-', this.robotId);
            break;
          case 54://光圈+
            this.sendData('PTZ_APERTURE+', this.robotId);
            break;
          case 55://光圈-
            this.sendData('PTZ_APERTURE-', this.robotId);
            break;
          case 56://远近+
            this.sendData('PTZ_ENLARGE', this.robotId);
            break;
          case 57://远近-
            this.sendData('PTZ_ENLARGE', this.robotId);
            break;
          case 48://亮度+
            this.sendData('BRI_UP', this.robotId);
            break;
          case 45://亮度-
            this.sendData('BRI_DOWN', this.robotId);
            break;
          case 84://前臂速度+
            if (this.slider.front < 100) {
              this.slider.front += 20;
              this.$refs.front.value = this.slider.front

            }
            break;
          case 89://前臂速度-
            if (this.slider.front > 20) {
              this.slider.front -= 20;
              this.$refs.front.value = this.slider.front

            }
            break;
          case 71://后臂速度+
            if (this.slider.after < 100) {
              this.slider.after += 20;
              this.$refs.after.value = this.slider.after

            }
            break;
          case 72://后臂速度-
            if (this.slider.after > 20) {
              this.slider.after -= 20;
              this.$refs.after.value = this.slider.after
            }
            break;
          case 86://前臂上升
            this.FAUP = true;
            this.armMove('FAUP', this.robotId);
            break;
          case 66://前臂下降
            this.FADOWN = true;
            this.armMove('FADOWN', this.robotId);
            break;
          case 78://后臂上升
            this.BAUP = true;
            this.armMove('BAUP', this.robotId);
            break;
          case 77://后臂下降
            this.BADOWN = true;
            this.armMove('BADOWN', this.robotId);
            break;
          case 219://前视图
            this.changeVideo('video-item-1');
            break;
          case 221:  //后视图
            this.changeVideo('video-item-2');
            break;
          case 220:  //辐射视图
            this.changeVideo('video-item-3');
            break;
          default:

        }
      }

    },


  }
})
