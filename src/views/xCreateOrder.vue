<script>

import MapLeaflet from "@/components/mapLeaflet.vue";
import Input from "@/views/uikit/Input.vue";
import {mapActions, mapGetters} from "vuex";
import "@/assets/styles/selectButtonPink.css"

export default {
  name: "xCreateOrder",
  components: {Input, MapLeaflet},
  data() {
    return {
      paymentOption: '',
      totalPayment: null,
      order: {
        fullName: 'sadas',
        description: '',
        phoneNumber: '',
        address: '',
        deliveryDate: new Date(),
      },
      selectButtonValues1: [{ name: "To'landi" }, { name: 'uyda beradi' }, { name: 'qarz berildi' }],
    }
  },
  methods: {
    ...mapActions(['removeProduct']),

  },
  computed: {
    ...mapGetters(['allProducts']),
    ...mapGetters(['total'])
  },
  mounted() {
    this.totalPayment  = this.total
  }


}
</script>

<template>

  <div class="grid p-fluid">
    <div class="col-12 md:col-6">

      <div class="card">
        <form action="#">
          <div class="field mb-2">
            <label for="fullName">Ism familiya</label>
            <input class="p-inputtext p-component" v-model="order.fullName" type="text" name="fullName">
          </div>

          <div class="field mb-2">
            <label for="phoneNumber">Telefon raqam</label>
            <input class="p-inputtext p-component" type="text" name="phoneNumber">
          </div>
          <div class="field mb-2">
            <label for="qishloq">Qishloq</label>
            <input class="p-inputtext p-component" type="text" name="qishloq">
          </div>
          <div class="field mb-2">
            <label for="address">Manzil</label>
            <input class="p-inputtext p-component" type="text" name="address">
          </div>
          <div class="field mb-2">
            <label >To'lov summa -> {{total}}</label>
            <input class="p-inputtext p-component" :value="total" type="text" >
          </div>
          <div class="field mb-2">
            <label>Yetkazib berish kuni</label>
            <Calendar inputId="calendar" v-model="order.deliveryDate"
                      showButtonBar showIcon  dateFormat="dd-mm-yy"></Calendar>
          </div>
          <div class="field mb-2">
            <label for="description">Qo'shimcha</label>
            <textarea class="p-inputtextarea p-inputtext p-component p-inputtextarea-resizable" data-pc-name="textarea"
                      data-pc-section="root" rows="3" cols="30"
                      style="min-height: 71px; overflow: hidden;"></textarea>
          </div>
          <div class="mb-2">
           <SelectButton v-model="paymentOption" :options="selectButtonValues1" optionLabel="name" />
          </div>
        </form>
        <mapLeaflet></mapLeaflet>
      </div>

    </div>

    <div class="col-12 md:col-6">
      <div class="card">
        <ul>
          <li class="each-product" v-for="(product, index) in allProducts" :key="index">
            <div class="custom  align-items-center justify-content-end">
              <button @click="removeProduct(index)" class="x-btn-product" style="color:red;"><i class="pi pi-times"></i>
              </button>
            </div>
            <div class="custom">
              <div class="font-bold">
                {{ product.name }}
              </div>
              <div>
                <input class="priceInput" type="number" v-model="product.price">
              </div>
            </div>
            <div>
              {{ product.description }}
            </div>
            <div class="custom align-items-center my-2">
              <div class="xProductQuantityCount align-items-center ">
                <button @click="product.quantity = product.quantity - 1" class="xProductQuantityCountBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                    <path
                        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                  </svg>
                </button>
                <input min="1" v-model="product.quantity" type="number" class="xProductQuantityCountInput">
                <button @click="product.quantity = product.quantity + 1" class="xProductQuantityCountBtn">
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                  </svg>
                </button>
              </div>
              <div class="font-bold ">
                {{ product.totalPrice = product.quantity * product.price }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.x-btn-product {
  cursor: pointer;
  border: none !important;
  background-color: transparent !important;
}

ul {
  margin-top: 0;
  padding: 0;
}

.each-product {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12) !important;
  border: 1px solid rgba(0, 0, 0, 0.27);
  list-style: none;
  border-radius: 5px;
  padding: 9px 9px 0 9px;
  margin-bottom: 10px;
}

.priceInput {
  outline: none;
  border: 1px solid lightslategray !important;
  border-radius: 5px;
  padding: 2px;
  max-width: 60px;
  text-align: end;
}

.custom {
  display: flex !important;
  justify-content: space-between;
}

.xProductQuantityCountBtn {
  background: transparent;
  border: none;
  font-weight: bolder;
  cursor: pointer;
}

.xProductQuantityCountInput {
  outline: none;
  padding: 0;
  border: none;
  width: 100%;
  font-weight: bold;
  text-align: center !important;
}

.xProductQuantityCountInput:focus {
  outline: none;
  padding: 0;
}

.xProductQuantityCount {

  display: flex;
  border: 1px solid lightslategray !important;
  border-radius: 5px;
  padding: 2px;
//padding: 0 0.5rem; width: 7.5rem; justify-content: space-between;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.rounded {
  border-radius: 7px;
}
</style>