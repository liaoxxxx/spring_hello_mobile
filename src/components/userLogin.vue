<template>
  <div class="hello" style="padding:2px">
    <mu-container style="max-width: 400px; width:100%;">
    <div>
        <mu-appbar style="width: 100%;" color="primary">
          <mu-button icon slot="left">
            <mu-icon value="menu"></mu-icon>
          </mu-button>
          Title
          <mu-menu slot="right">
            <mu-button flat>MENU</mu-button>
            <mu-list slot="content">
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>Menu Item 1</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-content>
                  <mu-list-item-title>Menu Item 2</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </mu-appbar>
    </div>
    <div>
      <mu-alert color="warning" @delete="alert1 = false" delete v-if="alert1" transition="mu-scale-transition">
        <mu-icon left value="warning"></mu-icon> {{this.alertMsg}}
      </mu-alert>
    </div>
    <div class="single-info-row">
      <mu-row gutter>
      </mu-row>
    </div>
    <div class="single-info-row">
      <mu-col span="12">
        请登录
      </mu-col>
      <mu-row gutter>
        <mu-col span="12">
          <label >用户名</label><mu-text-field v-model="username"></mu-text-field><br/>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col span="12">
          <label >密码</label><mu-text-field type="password" v-model="password"></mu-text-field><br/>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col span="12">
          <mu-button color="primary" type="submit" @click="handleLogin">登录</mu-button>
        </mu-col>
      </mu-row>
    </div>
    <div class="bottom-nav-box">
        <mu-bottom-nav :value.sync="shift" shift>
          <mu-bottom-nav-item value="home" title="Movies" icon="ondemand_video"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="music" title="Music" icon="music_note"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="books" title="Books" icon="books"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"></mu-bottom-nav-item>
        </mu-bottom-nav>
    </div>
    </mu-container>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import { getToken, setToken /*, removeToken */ } from '../util/Token.js'
// eslint-disable-next-line standard/object-curly-even-spacing
import { setUserInfo } from '../util/User'

export default {

  name: 'userLogin',

  data () {
    return {
      username: '',
      password: '',
      alertMsg: '初始化的警告信息',
      alert1: true
    }
  },
  created: function () {
    // eslint-disable-next-line no-unused-vars
    const that = this
    /* this.$request.get('/goodsapi/recommendList').then(function (response) {
      console.log(process.env)
      that.carouselImgS = response.data.data
      that.recommendedGoods = response.data.data
      // console.log(that.recommendedGoods)
      for (let i = 0; i < that.recommendedGoods.length; i++) {
        that.recommendedGoods[i].thumb = process.env.SERVER_HOST + JSON.parse(that.recommendedGoods[i].thumb)
      }
      // console.log(that.carouselImgS)
      console.log(that.recommendedGoods)
    })
      .catch(function (error) {
        console.log(error)
      }) */
  },
  methods: {
    handleLogin () {
      let token = getToken()
      // console.log(token)
      // console.log(typeof token)
      let that = this
      if (token === '' || token === null || token === 'undefined') {
        // console.log('to request login handle')
        let data = {'username': this.username,
          'password': this.password}
        this.$request.post('/userapi/login', data).then(function (response) {
          let resp = response.data
          // console.log(resp)
          if (resp.success === 'success') {
            setToken(resp.data.token)
            setUserInfo(resp.data.user)
            that.$router.push({
              path: 'userHome'
            })
          } else {
            this.toggleAlert(resp.message)
          }
        })
          .catch(function (error) {
            if (!(navigator.onLine)) {
              alert('网络失去连接')
            }
            console.log(error)
            alert('dddd')
          })
      } else {
        let data = {'token': token}
        this.$request.post('/userapi/info', data).then(function (response) {
          let resp = response.data
          // console.log(resp)
          if (resp.success === 'success') {
            setUserInfo(resp.data.user)
            that.$router.push({
              // eslint-disable-next-line standard/object-curly-even-spacing
              path: 'userHome', query: { id: 1}
            })
          } else {
            this.toggleAlert(resp.message)
          }
        })
          .catch(function (error) {
            if (!(navigator.onLine)) {
              alert('网络失去连接')
            }
            console.log(error)
            alert('bbbb')
          })
      }
    },
    changeActive (index) {
      this.active = index
    },
    shift () {
      console.log(999999)
    },
    toggleAlert (msg) {
      this.alertMsg = msg
      this.alert1 = !this.alert1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mint-swipe-item{
      width: 100%;
      height: 300px ;
      background-color: #ffb265;
    }
    .carousel-div{
      height: 300px;
    }
    .container{
      padding-right:0;
      padding-left: 0;
      margin-right: 0;
      margin-left: 0;
      width: 100%;
    }
  .bottom-nav-box{
    position: fixed;
    bottom:5px;
    width: inherit;
  }
  .gridlist-demo{
    width: 360px;
    height: 450px;
    overflow-y: auto;
  }
  .goods-list{
    height: 100%;
  }
  .d-flex{
    height: 100%;
  }
  .mu-alert{
    color: black;
  }
  .mu-grid-list{
    height: inherit;
  }
  .single-info-row{
    background-color: #fff;
    margin-bottom: 8px;
    border-radius: 1px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
</style>
