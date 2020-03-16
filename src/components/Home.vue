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
    <div class="goods-list">
      <mu-flex justify-content="center">
        <mu-paper :z-depth="1">
          <mu-grid-list class="gridlist-demo" >
            <mu-sub-header>December</mu-sub-header>
            <mu-grid-tile v-for="(item, index) in recommendedGoods" :key="index" @click="goGoods(item.id)">
              <img :src="item.thumb" >
              <span slot="title">{{item.title}}</span>
              <span slot="subTitle">￥<b>{{item.basePrice}}</b></span>
              <mu-button slot="action" icon>
                <mu-icon value="star_border"></mu-icon>
              </mu-button>
            </mu-grid-tile>
          </mu-grid-list>
        </mu-paper>
      </mu-flex>
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
export default {
  name: 'Home',

  data () {
    return {
      input: '默认',
      msg: 'Welcome to Your Vue.js App',
      current: 1,
      carouselImgS: [],
      recommendedGoods: [],
      active: 0
    }
  },
  created: function () {
    const that = this
    this.$request.get('/goodsapi/recommendList').then(function (response) {
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
      })
  },
  methods: {
    changeActive (index) {
      this.active = index
    },
    shift () {
      console.log(999999)
    },
    goGoods (goodsId) {
      console.log(goodsId)
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({ path: 'goods', query: { goodsId: goodsId }})
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
  .mu-paper{
    height: inherit;
  }
  .mu-grid-list{
    height: inherit;
  }
</style>
