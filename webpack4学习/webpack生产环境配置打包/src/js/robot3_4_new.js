import Vue from 'vue/dist/vue.esm';
import axios from 'axios'
//import JSMpeg from 'jsmpeg-player'



// eslint-disable-next-line
const app = new Vue({
  el: '#robot',
  data: {
    speed: 10,
    nowIndex: 0,
    btnIndex:0,
    detectorList: [],
    robot: {},
    robotId: '',
    urlHead: 'http://192.168.1.5:8080',
    allVideoList: [
      {
        id: 'play1',
        url:'http://192.168.1.5:8999/stream/player/6',
        name: '1',
        active: true
      },
      {
        id: 'play2',
        url: 'http://192.168.1.5:8999/stream/player/7',
        name: '2',
        active: false
      },
      {
        id: 'play3',
        url: 'http://192.168.1.5:8999/stream/player/8',
        name: '3',
        active: false
      },
      {
        id: 'play4',
        url: 'http://192.168.1.5:8999/stream/player/9',
        name: '4',
        active: false
      },
      {
        id: 'play5',
        url: 'http://192.168.1.5:8999/stream/player/10',
        name: '5',
        active: false
      },
      {
        id: 'play6',
        url: 'http://192.168.1.5:8999/stream/player/11',
        name: '6',
        active: false
      },
      {
        id: 'play7',
        url: 'http://192.168.1.5:8999/stream/player/12',
        name: '7',
        active: false
      }
    ],
    newList: [
      {
        id: 'play1',
        url:'http://192.168.1.5:8999/stream/player/1',
        name: '1',
        active: true
      },
      {
        id: 'play2',
        url: 'http://192.168.1.5:8999/stream/player/2',
        name: '2',
        active: false
      },
      {
        id: 'play3',
        url: 'http://192.168.1.5:8999/stream/player/3',
        name: '3',
        active: false
      },
      {
        id: 'play4',
        url: 'http://192.168.1.5:8999/stream/player/4',
        name: '4',
        active: false
      },
      {
        id: 'play5',
        url: 'http://192.168.1.5:8999/stream/player/5',
        name: '5',
        active: false
      }
    ],
    RA:null,
    RB:null,
  },
  created() {
    if(window.location.search.split('=')[1] == 5) {
      this.allVideoList = this.newList;
    }
  },
  mounted() {
    this.init();
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
      }).then(() => {
        axios({
          method: 'post',
          url: this.urlHead + '/robot/robot/startcomm/' + this.robot.id + `?token=${this.getCookie('token')}`
        }).then(() => {
          this.getAllData(this.robot.id);
          setInterval(() => {
            this.sendData().then(() => {
              this.getData('D3').then((res) => {
                this.RA = res.data.data.val;
              });
              this.getData('D3B').then((res) => {
                this.RB = res.data.data.val;
              });
            })
          }, 1000)
        })
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
    //切换视频展示
    changeVideo(id) {
      this.allVideoList.map((item) => {
        if (item.id === id) {
          item.active = true;
        } else if (item.active === true) {
          item.active = false;
        }
      })
    },
    //发送数据
    sendData() {
      return axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/sendData',
        params: {
          code: "D3",
          robotId: 5,
        }
      })
    },
    //获取机器人辐射探测数据
    getData(code){
      return axios({
        headers: {
          'token': this.getCookie('token'),
        },
        method: 'post',
        url: this.urlHead + '/robot/robot/getData',
        params: {
          code: code,
          robotId: 5,
        }
      })
    }
  }
})
