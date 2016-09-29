//index.js
//获取应用实例 
var app = getApp()
var types = ['default', 'primary', 'warn']
var qss = {
  data: {
    motto: '，请输入号码查归属吧！',
    userInfo: {},
    toasMsg:'　',
    inputValue:''
  },
  //输入内容后
  bindKeyInput:function(e) {
     this.setData({inputValue:e.detail.value})
  },
  //提交查询
  qsscheck:function(){ 
    var qvalue = this.data.inputValue
    console.log("提交的号码是："+qvalue) 
    var that = this
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
    if (!reg.test(qvalue)) {
      console.log("手机号码为空或不正确 不能继续")
      this.setData({toasMsg: "手机号码为空或不正确 不能继续"}) 
     } else {
       console.log("号码不为空，继续！")
        //调用网络请求
        app.GetHttpData(qvalue,function(result) { 
        that.setData({toasMsg: "结果:"+result.province + ' ' +result.city+'  ' +result.operator}) 
       }) 
     }
  }, 
  //加载时
  onLoad: function () {  
    console.log("加载了了index的onLoad")  
    var that = this  
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
}
//执行上方配置
Page(qss)