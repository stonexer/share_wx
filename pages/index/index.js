//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello Shanbay',
    userInfo: {},
    rotate: 0
  },
  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindInput(e) {
    console.log(e)
    this.setData({
      motto: e.detail.value
    })
  },

  bindTouchMove(e) {
    const touch = e.touches[0]

    if (this.lastTouch) {
      this.ctx.setFillStyle('#fdfdfd')
      this.ctx.fillRect(touch.x, touch.y, 5, 5)
      this.ctx.draw(true)
    }

    this.lastTouch = touch;

  },

  onLoad() {
    console.log('onLoad')

    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) => {
      //更新数据
      this.setData({
        userInfo:userInfo
      })
    })

    wx.onCompassChange((res) => {
      if (this.direction == null) {
        this.direction = res.direction;
      }

      this.setData({
        rotate: this.direction - res.direction
      })

      // wx.setScreenBrightness({
        // value: Math.abs((this.direction - res.direction - 180)) / 360
      // })
    })

    wx.startCompass()

    this.ctx = wx.createCanvasContext('myCanvas')
    this.ctx.setFillStyle('#209e85')
    this.ctx.fillRect(0, 0, 300, 200)
    this.ctx.draw()
  }
})
