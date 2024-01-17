export default {
    actions: {
        removeProduct({commit}, index) {
            commit('REMOVE_PRODUCT', index);
        },
        addProduct({commit}, product) {
            commit('ADD_PRODUCT', product)
        }
    },
    mutations: {
        REMOVE_PRODUCT(state, index) {
            // Check if the index is within the bounds of the array
            if (index >= 0 && index < state.productList.length) {
                // Remove the product at the specified index
                state.productList.splice(index, 1);
            }
        },
        ADD_PRODUCT(state, product) {
            state.productList.push(product);
        }
    },
    state: {
        totalPrice: 0,
        productList: [
            {
                id: 0,
                name: 'Sement',
                description: 'Quvasoy 400',
                price: 700,
                measurement: 'kg',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Kraska',
                description: 'Rangli Boyoq',
                price: 70000,
                measurement: 'dona',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Eleron',
                description: 'Shpaklofka',
                price: 3500,
                measurement: 'qop',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Albastr',
                description: 'kichik 25kg',
                price: 12000,
                measurement: 'qop',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Valik',
                description: 'Koreyskiy 700',
                price: 17000,
                measurement: 'dona',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Sement',
                description: 'Quvasoy 400',
                price: 700,
                measurement: 'kg',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Kraska',
                description: 'Rangli Boyoq',
                price: 70000,
                measurement: 'dona',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Eleron',
                description: 'Shpaklofka',
                price: 3500,
                measurement: 'qop',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Albastr',
                description: 'kichik 25kg',
                price: 12000,
                measurement: 'qop',
                quantity: 1,
                totalPrice: 0
            },
            {
                id: 0,
                name: 'Valik',
                description: 'Koreyskiy 700',
                price: 17000,
                measurement: 'dona',
                quantity: 1,
                totalPrice: 0
            }
        ],

    },
    getters: {
        allProducts(state) {
            return state.productList
        },
        total(state) {
            // Calculate the total price by summing up totalPrice for all products
            return state.productList.reduce((total, product) => total + product.totalPrice, 0);
        }
    }
}