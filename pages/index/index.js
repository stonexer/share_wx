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
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

    wx.onCompassChange(function (res) {
      if (that.direction == null) {
        that.direction = res.direction;
      }

      that.setData({
        rotate: that.direction - res.direction
      })

      wx.setScreenBrightness({
        value: Math.abs((that.direction - res.direction - 180)) / 360
      })
    })

    wx.startCompass()
  }
})
