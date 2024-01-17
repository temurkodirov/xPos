<script>
import L from "leaflet";
import QRCode from 'qrcode-generator';
export default {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      qrcodeData: null,
      lat: 0,
      lng: 0,
      map: null,
    };
  },
  methods: {
    generateQRCode() {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${this.latitude},${this.longitude}`;
      const qr = QRCode(0, 'L');
      qr.addData(googleMapsUrl);
      qr.make();

      this.qrcodeData = qr.createDataURL();
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          this.lat = 40.609179;
          this.lng = 72.713206;
          this.map.setView([this.lat, this.lng], 18);

          // Remove the existing marker before adding a new one
          this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              this.map.removeLayer(layer);
            }
          });

          L.marker([this.lat, this.lng], { draggable: true })
              .addTo(this.map)
              .on("dragend", (event) => {
                this.latitude = event.target._latlng.lat;
                this.longitude = event.target._latlng.lng;
                console.log(event.target._latlng);
              });
        });
      }
    },
  },
  mounted() {
    this.map = L.map(this.$refs.mapContainer).setView([40.609179, 72.713206], 13);

    // Add Google Satellite layer
    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(this.map);

    // Call getLocation to initially set the marker
    this.getLocation();
  },
};
</script>

<template>

  <div class="mb-2">
    <div ref="mapContainer" style="width: 100%; height: 400px"></div>
  </div>
  <button class="p-button mb-2 p-component map-btn" @click="generateQRCode">Generate QR Code for Google Maps</button>

  <div v-if="qrcodeData"  class=" qr-image mb-2">
    <img  :src="qrcodeData" alt="QR Code" />
  </div>
</template>

<style scoped>
.qr-image{
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12) !important;
  border: 1px solid rgba(0, 0, 0, 0.27);
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
.qr-image img{
  width: 150px;
  height: 150px;
}
.map-btn{
  width: 50%;
}
</style>
