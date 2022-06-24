<template>
  <div v-if="blogs.length > 0" class="home_category py-5 mb-lg-5">
    <div class="container-fluid">
      <div class="row">
        <div v-for="(item, index) in blogs" :key="index" class="col-md-6">
          <article class="box text-center">
            <figure class="mb-4">
              <nuxt-img
                preload
                format="webp"
                :src="uploadPath+item.image"
                alt="image"
                quality="100"
                sizes="xs:256 md:512"
              />
            </figure>
            <div class="desc_box">
              <h2 class="text-uppercase mb-3 font-weight-normal">
                {{ item.title }}
              </h2>
              <p class="mb-4" v-html="item.description" />
              <HomeLinkSetByType class="mx-auto btn-outline-primary" :center="true" :item="item" />
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogs: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/home/blogs/')
      this.blogs = data.data
    } catch (e) {

    }
  },
  computed: {
    uploadPath () {
      return process.env.uploadURL
    }
  },
  fetchOnServer: true
}
</script>

<style lang="scss" scoped>
.box {
    padding: 40px 80px;
    align-items: center;

    &.left {
        flex-direction: row;
        @media screen and (max-width: 768px){
            flex-direction: column;
        }
    }

    @media screen and (max-width: 768px){
        flex-direction: column;
    }

    figure {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 100%;
        }

        @media screen and (max-width: 768px){
            height: 400px;
        }
    }

    .desc_box {
        @media screen and (max-width: 768px){
            text-align: center;
        }
    }
}
</style>
