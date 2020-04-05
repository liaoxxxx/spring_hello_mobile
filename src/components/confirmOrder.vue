<template>
  <div class="hello" style="padding:2px">
    <mu-container style="max-width: 500px; width:100%;">
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
    <div class="page-title">
      <p>确认订单</p>
    </div>
    <div class="recipient-info-div">
      <mu-row gutter>
        <mu-col span="2">
          <div class="grid-cell">
            <div class="left">
              <img src="" alt="">
            </div>
          </div>
        </mu-col>
        <mu-col span="10">
          <div class="grid-cell">
            <div class="right recipient-info-row">
              <div class="recipient-name-row">
                <p>廖永坚 <span> 18676684597</span></p>
              </div>
              <div class="recipient-address-row">
                <p>广西壮族自治区南宁市兴宁区朝阳街道明秀东路178号江宇世纪城1栋</p>
              </div>
            </div>
          </div>
        </mu-col>
      </mu-row>
    </div>
      <br>
    <div class="goods-list-info-div">
      <mu-row gutter class="store-title">
        <mu-col span="6">
          <p>OPPO 直营旗舰店</p>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col span="3">
          <div class="grid-cell">
            <div class="left goods-thumb" >
              <img :src="goods.thumb" alt="">
            </div>
          </div>
        </mu-col>
        <mu-col span="7">
          <div class="grid-cell">
            <div class="right goods-info-row">
              <div class="goods-title-text">
                {{goods.title}}
              </div>
              <div class="goods-subtitle-text">
                <p>{{goods.subTitle}}</p>
              </div>
            </div>
          </div>
        </mu-col>
        <mu-col span="2">
          <div class="grid-cell">
            <div class="right goods-info-row">
              <div class="goods-price-text">
                <a>￥{{goods.showPrice}}</a>
              </div>
              <div class="goods-count-text">
                <p>x1</p>
              </div>
            </div>
          </div>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col>售后政策</mu-col>
        <mu-col></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col>配上方式</mu-col>
        <mu-col></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col>运&nbsp;&nbsp;费&nbsp;&nbsp;险</mu-col>
        <mu-col></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col>开具发票</mu-col>
        <mu-col></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col>订单备注</mu-col>
        <mu-col></mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col span="6"></mu-col>
        <mu-col span="6">共 1 件<span>小计</span>￥2000.00</mu-col>
      </mu-row>
    </div>
    <div >
      <p>匿名购买</p>
    </div>
    <div class=" bottom-nav-box">
      <mu-row gutter>
        <mu-col>共 <span>2</span>件</mu-col>
        <mu-col>合计：<span>￥2000.00</span></mu-col>
        <mu-col>
          <mu-button @click="submitOrder" color="error" class="submit-button">提交订单</mu-button>
        </mu-col>
      </mu-row>
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
      that.goods.thumb = JSON.parse(that.goods.thumb)
      for (let i = 0; i < that.goods.thumb.length; i++) {
        that.goods.thumb[i] = process.env.SERVER_HOST + that.goods.thumb[i]
      }
      console.log(that.goods.thumb)
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
    submitOrder () {
      let data = {}
      this.$request.post('/orderapi/create', data).then().catch()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mu-carousel-item img{
      height: 300px;
  }

  .recipient-info-div{
    background-color: #fff;
    width: 98%;
    margin: 0 auto;
    border-radius: 5px;
  }
  .recipient-info-row{
    width: 90%;
  }
  /*************************************/
  .store-title{
    line-height: 1;
    padding: 0;
    font-size: 16px;
  }
  .store-title .col{
    height: 32px;
  }
  .goods-list-info-div{
    background-color: #fff;
    width: 98%;
    margin: 0 auto;
    border-radius: 5px;
    padding: 5px;
  }
  .goods-thumb{
    padding: 5px;
  }
  .goods-thumb img{
    height: inherit;
    width: 100%
  }
  .goods-title-text{
    padding: 2px;
    margin-top: 5px;
    text-align: left;
    line-height: 1;
    display: -webkit-box;
    display: -moz-box;
    /*white-space: pre-wrap;*/
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;   /*显示行数*/
    font-size: 16px;
    overflow: hidden;
  }
  .goods-subtitle-text{
    text-align: left;
    font-size: 8px;
    background-color: #eaeaea;
    border-radius: 3px;
    margin-top: 5px;
    text-align: left;
    line-height: 1.2;
    display: -webkit-box;
    display: -moz-box;
    /*white-space: pre-wrap;*/
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;   /*显示行数*/
    overflow: hidden;
  }
</style>
