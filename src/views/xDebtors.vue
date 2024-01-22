<script>
export default {
  name: "xDebtors",
  data() {
    return {
      deleteDebtorDialog: false,
      debtor:{},
      confirmDeleteProduct(product) {
        console.log('hello')
        this.debtor = product;
        this.deleteDebtorDialog = true;
      },
      debtors: [
        {
          id:1,
          fullName: 'Eshmat ',
          description: 'orqa maxallanimadurlar',
          contact: '889997730',
          address: 'beshtol',
          amount: 12345,
          gDate: '1-20-2024',
          rDate: '1-20-2024'
        },
        {
          id:2,
          fullName: 'Eshmat ',
          description: 'orqa maxallanimadurlar',
          contact: '889997730',
          address: 'beshtol',
          amount: 12345,
          gDate: '1-20-2024',
          rDate: '1-20-2024'
        },
        {
          id:3,
          fullName: 'Eshmat ',
          description: 'orqa maxallanimadurlar',
          contact: '889997730',
          address: 'beshtol',
          amount: 12345,
          gDate: '1-20-2024',
          rDate: '1-20-2024'
        }
      ],
      selectedDebtors:[],
      filters: {},
    }
  },
  methods: {
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  }
}
</script>

<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
      <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
    </template>
    <template #end>
      <Button @click="console.log(selectedDebtors)" label="Xabar jo'natish" icon="pi pi-send" severity="help" class="mr-2"  />
      <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
      <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)"  />
    </template>
  </Toolbar>
  <DataTable ref="dt" :value="debtors" v-model:selection="selectedDebtors" dataKey="id"
             :paginator="true" :rows="10" :filters="filters"
             paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
    <template #header>
      <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
        <h4 class="m-0">Qarzdorlar</h4>
        <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText  placeholder="Search..." />
            </span>
      </div>
    </template>
    <Column selectionMode="multiple" style="width: 1rem" :exportable="false"></Column>
    <Column field="id" header="#"></Column>
    <Column field="fullName" header="Ism Familiya"></Column>
    <Column field="description" header="Izohlar"></Column>
    <Column field="contact" header="Aloqa"></Column>
    <Column field="address" header="Manzil"></Column>
    <Column field="amount" header="Miqdor"></Column>
    <Column :exportable="false" header="Sanalar" style="min-width:8rem">
      <template #body="slotProps">
        {{slotProps.data.gDate}} <br>
        {{slotProps.data.rDate}}
      </template>
    </Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-pencil" outlined rounded class="mr-2"  />
        <Button @click="confirmDeleteProduct(slotProps.data)" icon="pi pi-trash"  outlined rounded severity="danger"  />
      </template>
    </Column>

  </DataTable>
  <Dialog v-model:visible="deleteDebtorDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="debtor"><b> {{debtor.fullName}}</b> qarzini o'chidirish xohlaysizmi?</span>
    </div>
    <template #footer>
      <Button label="Yo'q" icon="pi pi-times" text @click="deleteDebtorDialog = false"/>
      <Button label="Ha" icon="pi pi-check" text />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>