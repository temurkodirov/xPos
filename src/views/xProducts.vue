<script>
import {ref, onMounted} from 'vue';
import ProductService from '@/service/ProductService';
import Input from "@/views/uikit/Input.vue";
import {mapActions} from "vuex";

export default {
  name: 'xProducts',
  components: {Input},
  data() {
    return {
      productList: [
        {
          id: 0,
          name: 'Sement',
          description: 'Quvasoy 400',
          price: 700,
          measurement: 'kg',
          quantity: 1,
          totalPrice: 0,
          image: "bamboo-watch.jpg"
        },
        {
          id: 0,
          name: 'Kraska',
          description: 'Rangli Boyoq',
          price: 70000,
          measurement: 'dona',
          quantity: 1,
          totalPrice: 0,
          image: "black-watch.jpg"
        },
        {
          id: 0,
          name: 'Eleron',
          description: 'Shpaklofka',
          price: 3500,
          measurement: 'qop',
          quantity: 1,
          totalPrice: 0,
          image: "blue-band.jpg"
        },
        {
          id: 0,
          name: 'Albastr',
          description: 'kichik 25kg',
          price: 12000,
          measurement: 'qop',
          quantity: 1,
          totalPrice: 0,
          image: "blue-t-shirt.jpg"
        },
        {
          id: 0,
          name: 'Valik',
          description: 'Koreyskiy 700',
          price: 17000,
          measurement: 'dona',
          quantity: 1,
          totalPrice: 0,
          image: "bracelet.jpg"
        }
      ],
      picklistValue: [
        [
          {name: 'San Francisco', code: 'SF'},
          {name: 'London', code: 'LDN'},
          {name: 'Paris', code: 'PRS'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Berlin', code: 'BRL'},
          {name: 'Barcelona', code: 'BRC'},
          {name: 'Rome', code: 'RM'},
        ],
        [],
      ],
      orderlistValue: [
        {name: 'San Francisco', code: 'SF'},
        {name: 'London', code: 'LDN'},
        {name: 'Paris', code: 'PRS'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Berlin', code: 'BRL'},
        {name: 'Barcelona', code: 'BRC'},
        {name: 'Rome', code: 'RM'},
      ],
      dataviewValue: null,
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
      ],
      productService: new ProductService(),
    };
  },
  methods: {
    ...mapActions(['addProduct']),
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
  },
  mounted() {
    this.productService.getProductsSmall().then((data) => (this.dataviewValue = data));
  },
};

</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>DataView</h5>
        <DataView :value="productList" :layout="layout" :paginator="true" :rows="8" :sortOrder="sortOrder"
                  :sortField="sortField">


          <template #grid="slotProps">
            <div class="col-12 md:col-4">
              <div class="card p-3 m-3 border-1 surface-border">
                <div class="text-center">
                  <img :src="'demo/images/product/' + slotProps.data.image"
                       :alt="slotProps.data.name" class="w-12 rounded shadow-2 mb-2"/>
                  <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                  <div class="mb-3">{{ slotProps.data.description }}</div>
                </div>
                <div class="flex align-items-center justify-content-between">
                  <span class="text-2xl font-semibold"> ${{ slotProps.data.price }}</span>
                  <Button @click="addProduct(slotProps.data)"  icon="pi pi-shopping-cart"></Button>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
    <!--shopped basket-->


    <!--end - shopped basket-->
  </div>
</template>

<style scoped>
.priceInput{
  outline:none;
  border: 1px solid lightslategray!important;
  border-radius: 5px;
  padding:2px;
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
  border: 1px solid lightslategray!important;
  border-radius: 5px;
  padding:2px;
//padding: 0 0.5rem;
  width: 7.5rem;
  justify-content: space-between;
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