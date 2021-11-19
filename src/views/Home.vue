<template>
  <div class="container hp">
        <div class="hp__nav-cont">
          <div class="hp__nav-breadcrumbs-cont">
            <router-link class="hp__nav-breadcrumbs-link" to="/">Главная</router-link>
            <span class="hp__nav-breadcrumbs-link">Каталог товаров</span>
          </div>
          <div class="hp__nav-btns-cont">
            <router-link class="theme-btn-transp" to="/cart">Корзина</router-link>
            <select v-model="filter" class="theme-btn-transp hp__nav-select-btn">
              <option value="new" selected>Порядок: сперва новые</option>
              <option value="cheap" selected>Порядок: сперва дешевле</option>
              <option value="expensive" selected>Порядок: сперва дороже</option>
            </select>
          </div>
        </div>
        <div class="products">
            <div class="product-item" v-for="product in productsForOutput" :key="product.id">
              <img src="@/assets/shopping-bag-icon.svg" alt="" class="product-item__add-to-cart-btn" v-on:click="addToCart(product.id)">
              <img src="@/assets/heart_outline.svg" alt="" class="product-item__like-btn">
              <img :src="'/photos/' + product.thumb" alt="" class="product-item__thumb">
              <h3 class="product-item__header">{{ product.title }}</h3>
              <p class="product-item__descr">{{ product.description }}</p>
              <p class="product-item__price">{{ formatPrice(product.price) }} руб.</p>
            </div>
        </div>
  </div>
</template>

<script>
import {EVENT_BUS} from "../main"

export default {
  name: "Home",
  data(){
    return{
      filter: "new",
    }
  },
  methods:{
    formatPrice(price){
      return price.toLocaleString("ru-RU")
    },
    addToCart(id){
      EVENT_BUS.$emit("addToCart",id);
    }
  },
  computed:{
    productsForOutput(){
      let productsForOutput;
      if(this.filter === "new")
        productsForOutput = this.$parent.products
      if(this.filter === "cheap")
        productsForOutput = [...this.$parent.products].sort((a,b)=> a.price - b.price)
      if(this.filter === "expensive")
        productsForOutput = [...this.$parent.products].sort((a,b)=> b.price - a.price)
      return productsForOutput;
    }
  },
}
</script>