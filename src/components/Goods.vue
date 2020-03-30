<template>
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
    <div class="carousel-div">
        <mu-carousel :active="active">
          <mu-icon value="arrow_back" slot="left"></mu-icon>
          <mu-icon value="arrow_forward" slot="right"></mu-icon>
          <template slot="indicator" slot-scope="{index, active }">
            <mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
              <span class="rect-indicator"></span>
            </mu-button>
          </template>
          <mu-carousel-item    v-for="(item, index) in goods.images" :key="index">
            <img :src="item" >
          </mu-carousel-item>
        </mu-carousel>
    </div>
      <!-------------------------------------------->
    <div class="price-title-row single-info-row">
      <div class="price-text-row">
        <mu-row gutter>
          <mu-col span="3" class="left-col">
            <span class="price-text-row-basePrice">￥{{goods.basePrice}}</span>
          </mu-col>
          <mu-col span="3">
            <span class="price-text-row-showPrice">￥{{goods.showPrice}}</span>
          </mu-col>
          <mu-col span="6"></mu-col>
        </mu-row>
      </div>
      <div class="title-text-row">
        <mu-col span="9" class="left-col">
          <span class="title-text-row-main">{{goods.title}}</span>
        </mu-col>
        <mu-col span="10">
          <span class="title-text-row-sub">{{goods.subTitle}}</span>
        </mu-col>
      </div>
    </div>
      <!-------------------------------------------->
    <div  class="express-info-row single-info-row">
      <mu-row gutter>
        <mu-col span="2" class="left-col">发货</mu-col>
        <mu-col span="5"><span><img class="location-icon" src="~icon/baseline_location_on_black_48dp.png" alt=""></span>广西南宁</mu-col>
        <mu-col span="2">快递</mu-col>
        <mu-col span="3"><span>月销</span>2000</mu-col>
      </mu-row>
    </div>
      <!-------------------------------------------->
    <div class="sale-protection-row single-info-row">
      <mu-row gutter>
        <mu-col span="2" class="left-col">保障</mu-col>
        <mu-col span="10">假一赔三<span>只换不修</span>7天无理由退换</mu-col>
      </mu-row>
    </div>
      <!-------------------------------------------->
    <div class="choice-category-row single-info-row">
      <mu-row gutter>
        <mu-col span="2" class="left-col">选择</mu-col>
        <mu-col span="6">选择颜色分类</mu-col>
      </mu-row>
    </div>
    <!-------------------------------------------->
    <div class="single-info-row">
      <mu-row gutter>
        <mu-col span="2" class="left-col">参数</mu-col>
        <mu-col span="6">品牌型号...</mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col span="12"></mu-col>
      </mu-row>
    </div>
    <!----------------------------->
    <div class="single-info-row">
      <mu-row gutter>
        <mu-col span="2" class="left-col">数量</mu-col>
        <mu-col span="6">共 1 件</mu-col>
        <mu-col span="4"><span>小计</span>￥2000.00</mu-col>
      </mu-row>
    </div>
    <div class="goods-comment-row single-info-row">
      <mu-row gutter>
        <mu-col span="4" class="left-col">宝贝评价(18)</mu-col>
        <mu-col span="4"></mu-col>
        <mu-col span="4">查看全部<span><img class="load-more-icon" src="~icon/baseline_keyboard_arrow_right_black_48dp.png" alt=""></span></mu-col>
      </mu-row>
    </div>
    <div class="bottom-nav-box">
      <mu-row gutter>
        <mu-col><mu-button color="primary">加入购物车</mu-button></mu-col>
        <mu-col><mu-button color="secondary">添加收藏</mu-button></mu-col>
        <mu-col>
          <mu-button color="error" @click="goConfirmOrder(goods.id)">立即购买</mu-button>
        </mu-col>
      </mu-row>
    </div>
    </mu-container>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      input: '默认',
      msg: 'Welcome to Your Vue.js App',
      current: 1,
      active: 1,
      goods: {
        id: 0,
        name: '',
        cateId: 0,
        sortRecommend: 0,
        title: '',
        subTitle: '',
        summary: '',
        images: [],
        thumb: '',
        basePrice: 0,
        inputPrice: 0,
        showPrice: 0
      }
    }
  },
  created: function () {
    const that = this
    const goodsId = this.$route.query.goodsId
    this.$request.get('/goodsapi/findone/' + goodsId).then(function (response) {
      that.goods = response.data.data
      that.goods.images = JSON.parse(that.goods.images)
      for (let i = 0; i < that.goods.images.length; i++) {
        that.goods.images[i] = process.env.SERVER_HOST + that.goods.images[i]
      }
      console.log(that.goods.images)
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
    goConfirmOrder (goodsId) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      this.$router.push({
        // eslint-disable-next-line standard/object-curly-even-spacing
        path: 'confirmOrder', query: { goodsId: goodsId}

      })
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
    .mu-carousel{
      height: 300px;
    }
    .mu-carousel-item{
      height: 300px;
    }
    .mu-carousel-item img{
      height: 300px;
    }
    /****************************/
    .price-title-row{
      background-color: #fff;
      margin-bottom: 5px;
      padding: 2px;
    }
    .price-text-row-basePrice{
      font-size: 22px;
      color: red;
      border: #606166;
      border-radius: 4px;
    }
    .price-text-row-showPrice{
      font-size: 16px;
      color: #606166;
      border: #606166;
      border-radius: 3px;
      text-decoration:line-through;
      text-align: left;
      position: relative;
      top: 2px;
      text-align: left;
    }
    .title-text-row{
      text-align: center;
    }
    .title-text-row{
      padding-left: 10px;
      overflow: auto;
    }
    .title-text-row-main{
      font-size: 18px;
      text-align: left;
      width: 100%;
      float: left;
    }
    .title-text-row-sub{
      font-size: 14px;
      text-align: left;
      color: #606166;
      width: 100%;
      float: left;
    }
    /*****************************/
    .express-info-row{
    }
    .sale-protection-row{
    }
    .choice-category-row{
    }
    /******************************/
    .single-info-row{
      background-color: #fff;
      margin-bottom: 8px;
      border-radius: 1px;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .location-icon{
      width: 18px;
      height: 18px;
      position: relative;
      top: 3px;
    }
    .left-col{
      color: #606166;
    }
    .load-more-icon{
      width: 16px;
      height: 16px;
      position: relative;
      top: 2px;
    }
</style>
