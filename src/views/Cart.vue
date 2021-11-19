<template>
  <div class="container cart">
      <div class="cart-items-cont">
        <div class="cart-items-cont__titles-cont">
          <span class="cart-items-cont__title-item">Товар</span>
          <span class="cart-items-cont__title-item">К-во</span>
        </div>
        <div class="cart-items-cont__items-list" v-if="cart.length">
          <div class="cart-item" v-for="product in cart" :key="product.id">
            <div class="cart-item__thumb-cont">
              <img :src="'/photos/'+product.thumb" alt="" class="cart-item__thumb">
            </div>
            <div class="cart-item__info-cont">
              <h3 class="cart-item__header">{{ product.title }}</h3>
              <p class="cart-item__descr">{{ product.description }}</p>
              <p class="cart-item__price">{{ formatPrice(product.price) }} руб.</p>
              <p class="cart-item__actions-cont">
                <span class="cart-item__action-item">Избранные</span>
                <span class="cart-item__action-item" v-on:click="removeProduct(product.id)">Удалить</span>
              </p>
            </div>
            <div class="cart-item__prod-quantity-cont">
              <input v-model="product.quantity" min="1" max="5" type="number" class="cart-item__prod-quantity-input">
              <span v-on:click="addProduct(product)" class="cart-item__prod-quantity-btn btn_up"><img src="@/assets/arrow-up.svg" alt=""></span>
              <span v-on:click="addProduct(product,false)" class="cart-item__prod-quantity-btn btn_down"><img src="@/assets/arrow-up.svg" alt=""></span>
            </div>
          </div>
        </div>
        <p class="cart-items-msg" v-else>Ваша корзина пуста...</p>
        <div class="cart-actions-cont">
          <button class="theme-btn-transp clear_cart_btn" v-on:click="clearCart">Очистить корзину</button>
          <router-link to="/" class="theme-btn-transp black-btn">Продолжить покупки</router-link>
        </div>
      </div>
      <div class="cart-total-cont">
        <h3 class="cart-total__header">Оформление заказа</h3>
        <p class="cart-total__input-line">
          <input type="text" class="cart-total__input" placeholder="Ваше имя">
        </p>
        <p class="cart-total__input-line">
          <input type="tel" class="cart-total__input" placeholder="Номер телефона">
        </p>
        <p class="cart-total__input-line">
          <input type="text" class="cart-total__input" placeholder="Адрес доставки">
        </p>
        <p class="cart-total__subtotal">Итого: <span class="cart-total__subtotal-price">{{ formatPrice(cartTotal) }} руб.</span></p>
        <button class="theme-btn-transp cart-total__submit-btn">Оформить заказ</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  computed:{
    cart(){
      return this.$parent.cart;
    },
    cartTotal(){
      let total = 0;
      for(let item of this.cart) total += item.price * item.quantity;
      return total;
    }
  },
  methods:{
    formatPrice(price){
      return price.toLocaleString("ru-RU")
    },
    addProduct(product,increase = true){
      if(increase && product.quantity < 5) product.quantity++
      else if ( !increase && product.quantity > 1) product.quantity--
    },
    clearCart(){
      this.$parent.cart = [];
    },
    removeProduct(id){
      this.$parent.cart = [...this.$parent.cart.filter((el)=> el.id !== id)]
    }
  }
}
</script>