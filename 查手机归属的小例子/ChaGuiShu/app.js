//app.js
App( {
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync( 'logs' ) || []
    logs.unshift( Date.now() )
    wx.setStorageSync( 'logs', logs )
  },
  //获取远程数据，通过API GET方式 数据格式为json
  GetHttpData(PhoneNum,callback) { 
    console.log("向服务器提交号码："+PhoneNum) 
    wx.request( { 
      url: 'http://apicloud.mob.com/v1/mobile/address/query?key=17895d7173644&phone='+PhoneNum, 
      data: {
        x: '',
        y: ''
      },
      //json格式的的header头
      header: {
        'Content-Type': 'application/json'
      },
      success: function( res ) {
        console.log( "成功"+res.data )
        var qresult = res.data.result //获取json数组 
        callback(qresult)
      }
      ,fail: function( res ) {
        console.log( "失败"+res.data )
      }
      ,complete: function( res ) {
        console.log( "完成"+res.data )
      } 
    })
  },
  getUserInfo: function( cb ) {
    var that = this
    if( this.globalData.userInfo ) {
      typeof cb == "function" && cb( this.globalData.userInfo )
    } else {
      //调用登录接口
      wx.login( {
        success: function() {
          wx.getUserInfo( {
            success: function( res ) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb( that.globalData.userInfo )
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})