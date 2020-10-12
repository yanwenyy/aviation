<template>

  <div class="listBox box-sizing" v-infinite-scroll="getDataList" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
    <div>{{login}}</div>
    <div class="list" v-for="item in dataList" :key="item.index">{{item.evnCarNum}}</div>
    <div class="load-box" v-if="loading">
      <img src="../../static/img/loading.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      path:'',
      login:'',
      dataForm: {
        evnCarNum: '',
        registTime: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      haveData:true,
      busy: false,
      loading:false
    }
  },
  computed: {
    myValue() {
      return this.$store.state.loginState
    }
  },
  watch: {
    myValue: function(newVal, oldVal) {
      //其他业务代码
      this.login=this.$store.state.loginState;
    }
  },
  mounted(){
    this.path=this.$baseUrl.httpUrl;
    // this.getDataList();
    console.log(this.$store.state.loginState)
  },
  methods:{
    // 获取数据列表
    getDataList () {
      this.busy = true;
      this.loading=this.dataList!=''&&true;
      this.$http({
        url: this.$http.adornUrl('/jinding/factory/car/list'),
        method: 'get',
        params: this.$http.adornParams({
          'pageNum': this.pageIndex,
          'pageSize': this.pageSize,
          'evnCarNum': this.dataForm.evnCarNum,
          'registTime': this.dataForm.registTime||'',
        })
      }).then(({data}) => {
        if (data && data.data!='' && data.code === 10000) {
          this.loading=false;
          var datas=this.dataList.concat(data.data);
          this.dataList =datas;
          this.pageIndex=this.pageIndex+1;
          this.busy = false;
        } else {
          this.haveData=false;
          this.busy = true;
          this.loading=false;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .listBox{
    padding:10px;
  }
  .list{
    font-size: 18px;
    background: #42b983;
    margin: 10px;
    height: 50px;
  }
  .load-box{
    text-align: center;
  }
  .load-box>img{
    width: 60px;
    height: auto;
    transition: 0.5s;
    transform-origin: 30px 30px;
    animation: rotate 5s linear infinite;
  }
  @keyframes rotate{
    from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
  }
</style>
