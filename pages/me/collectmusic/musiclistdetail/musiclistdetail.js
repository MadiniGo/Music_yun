// pages/me/collectmusic/musiclistdetail/musiclistdetail.js
var util = require("../../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
     var id = options.id;
     var playListUrl =  app.globalData.musicBase1+"/playlist/detail/?id="+id;
     this.getMusicDetailData(playListUrl);
  },
getMusicDetailData:function(url){
  var that = this;
  wx.request({
    url: url,
    success:(res)=>{
      that.processPlayListData(res.data.result)
      console.log(res.data.result)
      wx.setNavigationBarTitle({
        title: res.data.result.name,
      })
    },
    fail:(error)=>{
      console.log(error)
    }
  })
},
processPlayListData:function(data){
  var songList =[];
  for(var idx in data.tracks){
      var song =  data.tracks[idx];
      var temp={
        songName : song.name,
        songId : song.id,
        albumId: song.album.id,
        songImg : song.album.blurPicUrl,
        albumName:song.album.name,
        songArtists : song.artists[0].name
      } 
      songList.push(temp)
}
console.log(songList)
  if (data.description !=null){
    var description = data.description.substr(0,40)+"......"
  }
  var playListDetail = {
    coverImg: data.coverImgUrl,
    listName: data.name,
    description: description,
    listId: data.id,
    createTime: data.createTime,
    commentCount: data.commentCount,
    trackCount: data.trackCount,
    shareCount: data.shareCount,
    updateTime: util.dateTime(data.updateTime),
    creator:data.creator.nickname,
  }
  this.setData({
    playListDetail : playListDetail,
    songList: songList
  })
},
playSong:function(e){
  var that = this;
  var songName = e.currentTarget.dataset.songName;
  var songId = e.currentTarget.dataset.songId;
  var imgUrl = e.currentTarget.dataset.songImg;
  var singer = e.currentTarget.dataset.singer;
  var albumName = e.currentTarget.dataset.albumName
  var song
    var songUrl = "https://api.imjad.cn/cloudmusic/?type=song&id=" + songId;
    wx.request({
      url: songUrl,
      header: {
        "content-type": "json"
      },
      success: (res) => {
        that.processSongData(res.data,songName,songId,imgUrl,singer,albumName)
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  processSongData: function (data, songName, songId, imgUrl, singer, albumName){
    var that=this;
    var songUrl = data.data[0]
    var songData={
      songUrl:songUrl.url,
      songLevel:songUrl.level
    }
    this.setData({
      songData:songData
    })
    if (!this.data.songData.songLevel) {
      wx.showModal({
        title: '提示',
        content: '没有版权',
        showCancel:false,
      })
    }else{
      
      var temp={
        songId: songId,
        songName: songName,
        songUrl: songUrl.url,
        imgUrl: imgUrl,
        singer: singer,
        albumName: albumName
      };
      app.globalData.g_songUrl = this.data.songData.songUrl;
      app.globalData.g_isPlayMusic = true;
      wx.setStorageSync("playSong", temp);
      wx.playBackgroundAudio({
      dataUrl: app.globalData.g_songUrl,
      })
      wx.showToast({
        title: '播放音乐',
        success:function(){
          wx.navigateTo({
            url: '../../../playmusic/playmusic',
          })
        }
      })  
    }
    console.log(app.globalData.g_currentSongId)
  },
backToDetail:function(){
  wx.navigateTo({
    url: '/pages/me/collectmusic/collectmusic',
  })
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