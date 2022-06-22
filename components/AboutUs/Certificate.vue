<template>
  <section class="certificate">
    <div class="container">
      <div class="row justify-content-center">
        <ul class="align-items-center">
          <li v-for="(certificate, index) in certificates" :key="index">
            <a :href="certificate.document_file" target="_blank"><img class="img-fluid" :src="certificate.image"></a>
          </li>
          <!-- <li><a href="#"><img class="img-fluid" src="https://mesosystem.com/assets/images/norte.png"></a></li>
          <li><a href="#"><img class="img-fluid" src="https://mesosystem.com/assets/images/pr.png"></a></li>
          <li><a href="#"><img class="img-fluid" src="https://mesosystem.com/assets/images/uniao.png"></a></li>
          <li><a href="#"><img class="img-fluid" src="https://mesosystem.com/assets/images/PME_Lider__copy-01.png"></a></li>
          <li><a href="#"><img class="img-fluid" src="https://mesosystem.com/assets/images/robots.png"></a></li> -->
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      certificates: []
    }
  },
  async fetch () {
    const { data } = await this.$axios.get('certificate')
    this.certificates = data.data
  },
  fetchOnServer: true
}
</script>
