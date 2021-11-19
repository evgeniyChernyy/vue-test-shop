<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {EVENT_BUS} from "./main"

export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      products: null,
      cart:[]
    }
  },
  methods:{
    addToCart(id){
        let product = null;
        for(let item of this.products){
          if(item.id === id)
            product = Object.assign({},item)
        }
        if(!product) return;
        for(let item of this.cart){
          if (item.id === id) return;
        }
        product["quantity"] = 1;
        this.cart.push(product);
    }
  },
  beforeMount() {
    fetch("products.json")
      .then((response)=>{
        return response.json()
      })
      .then((data)=> this.products = data)
  },
  mounted(){
    EVENT_BUS.$on("addToCart",this.addToCart)
  }
}
</script>
