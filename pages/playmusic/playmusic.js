// pages/playmusic/playmusic.js
var app = getApp();
var backgroundAudioManager=wx.getBackgroundAudioManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic:false,
    songName:"",
    songId:"",
    songImg:"",
    songUrl:"",
    musicTime:0,
    showTime1:"00：00",
    showTime2: "00：00",
    audioSeek: 0,
    audioDuration: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var song = wx.getStorageSync('playSong');
    wx.setNavigationBarTitle({
      title: app.globalData.g_isPlayMusic ? song.songName :'豆沙音乐',
    })
    this.setData({
      songName: song.songName ? song.songName :'没有歌曲',
      songId: song.songId ? song.songId : null,
      songUrl: song.songUrl ? song.songUrl:null,
      songImg: song.imgUrl ? song.imgUrl :null,
      albumName: song.albumName ? song.albumName:null,
      singer:song.singer?song.singer:null,
      isPlayMusic: app.globalData.g_isPlayMusic
    })
    this.setMonitor();
    this.getMusicStatus();
  },
playSong:function(){
  var that = this;
 if(this.data.isPlayMusic){
   backgroundAudioManager.pause();
  backgroundAudioManager.onPause(function(){
     that.setData({
        isPlayMusic:false
     })
     app.globalData.g_isPlayMusic=false
  })
 }else{
   backgroundAudioManager.play();
   backgroundAudioManager.onPlay(function(){
    that.setData({
      isPlayMusic: true
    }) 
     app.globalData.g_isPlayMusic = true
   })
 }
},
setMonitor:function(){
  var that = this;
    backgroundAudioManager.onEnded(function(){
      that.setData({
        isPlayMusic:!that.data.isPlayMusic
      })
  
      app.globalData.g_isPlayMusic=false
    })
},
getMusicStatus(){
  var that =this;
  setTimeout(function(){
    
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        var duration = res.duration;
        var min = parseInt(duration/60);
        var s = parseInt(duration%60);
        if(min.toString.length==1){
          min = "0"+min;
        }
        
        that.setData({
          audioDuration:duration,
          showTime2:min+":"+s
        })
      }
    })
  }, 5000)
},

sliderChange:function(e){
  var isPlayMusic = this.data.isPlayMusic;
  var value = e.detail.value;
  this.setData({ audioTime: value });
  var duration = this.data.audioDuration;
  //根据进度条百分比及歌曲总时间，计算拖动位置的时间
  value = parseInt(value * duration / 100);
  //更改状态
  this.setData({ audioSeek: value, isPlayAudio: true })
  backgroundAudioManager.seek(value);
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})