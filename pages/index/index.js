// pages/fm/fm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchResult: "",
    banner:"",
    bannerUrls: [
     "http://p1.music.126.net/eHvE1qG0Jhys80s1rOJGEA==/109951164170115694.jpg",
      "http://p1.music.126.net/K4A_Bdn3x8qM6wceXCt7rA==/109951164170115953.jpg",
      "http://p1.music.126.net/VUtWoT-lzuCm6PNG4oUgfQ==/109951164169409191.jpg",
      "http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg",
      "http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  onClear: function() {
    this.setData({
      inputVal: ""
    })
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    })
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  searchInput: function(e) {
    var that = this
    this.setData({
      inputShowed: true,
      inputVal: e.detail.value
    });
    if (!this.data.inputVal) {
      this.setData({
        inputShowed: false
      })
      return
    } else {
      wx.request({
        url: app.globalData.musicBase + '/search',
        data: {
          keywords: e.detail.value
        },
        method: 'GET',
        success: function(res) {
          let temp = []
          console.log(res.data.result)
          if (!res.data.result.songs) {
            return;
          }
          res.data.result.songs.forEach((song, index) => {
            temp.push({
              songId: song.id,
              songName: song.name,
              songUrl: song.mp3Url,
              imgUrl: song.album.picUrl,
              singer: song.artists[0].name,
              albumName: song.album.name
            })
            that.setData({
              searchResult: temp
            })

          })
          console.log(that.data.searchResult)
          // 存入搜索的结果进缓存
          wx.setStorage({
            key: "searchReault",
            data: temp
          })
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
    }
  },
  playSong: function(e) {
    var that = this;
    var songName = e.currentTarget.dataset.songName;
    var songId = e.currentTarget.dataset.songId;
    var imgUrl = e.currentTarget.dataset.imgUrl;
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
        that.processSongData(res.data, songName, songId, imgUrl, singer, albumName)
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  processSongData: function(data, songName, songId, imgUrl, singer, albumName) {
    var that = this;
    var songUrl = data.data[0]
    var songData = {
      songUrl: songUrl.url,
      songLevel: songUrl.level
    }
    this.setData({
      songData: songData
    })
    if (!this.data.songData.songLevel) {
      wx.showModal({
        title: '提示',
        content: '没有版权',
        showCancel: false,
      })
    } else {
      var temp = {
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
        success:function(){
          wx.showToast({
            title: '播放音乐',
            success: function () {
              wx.navigateTo({
                url: '/pages/playmusic/playmusic',
              })
            }
          })
        }
      })
     
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onTapToPlay: function() {
    wx.navigateTo({
      url: '/pages/playmusic/playmusic',
    })
  },
  onLoad: function(options) {
    this.getPersonalizedData();

  },
getPersonalizedData : function(){
  var that= this;
  wx.request({
    url: app.globalData.musicBase + "/personalized",
    success: function (res) {
      that.processpersonalListData(res.data.result)
    }
  })
},
processpersonalListData:function(data){
  var personalList=[];
  data.forEach((list,index)=>{
    personalList.push({
      listId:list.id,
      picUrl:list.picUrl,
      listName:list.name
    })
  })
  this.setData({
    personalList:personalList
  })
  console.log(this.data.personalList)
},
onTapToListDetail:function(e){
   var id = e.currentTarget.dataset.listId;
   wx.navigateTo({
     url:"/pages/me/collectmusic/musiclistdetail/musiclistdetail?id="+id
   })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getPersonalizedData();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})