<template>
<div class="header-row-fixed">
  <mu-appbar style="width: 100%;" color="primary">
    <mu-button icon slot="left">
      <mu-icon value="menu"></mu-icon>
    </mu-button>
    {{titleText}}
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
</template>
<script>
export default {
  name: 'headerRow',
  data () {
    return {
    }
  },
  // eslint-disable-next-line vue/no-dupe-keys
  props: ['titleText'],
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
