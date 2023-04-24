<template>
  <div class="lines-segmentation">
    <h2 v-if="title" class="title">
      {{ title.title }}
    </h2>
    <span v-if="description && description.content" class="description" v-html="description.content" />
    <div class="segmentations">
      <template v-for="(item, i) in segmentations">
        <UiSegmentations :key="i" :data="item" />
      </template>
    </div>
    <div v-if="content" class="content">
      <h6 v-if="content.title">
        {{ content.title }}
      </h6>
      <div class="row">
        <div v-if="content.content" v-html="content.content" />
        <figure v-if="content.media">
          <nuxt-img
            :src="content.media"
            alt="media"
          />
        </figure>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      segmentations: []
    }
  },

  async fetch () {
    const url = '/get-page-content?page=lines-segmentation'
    const { data } = await this.$axios.$get(url)
    this.data = data
  },

  computed: {
    title () {
      return this.data.find(val => val.slug === 'mesocross-lines-segmentation-1')
    },
    description () {
      return this.data.find(val => val.slug === 'mesocross-lines-segmentation-2')
    },
    content () {
      return this.data.find(val => val.slug === 'mesocross-lines-segmentation-3')
    }
  },
  created () {
    this.getSegmentations()
  },

  methods: {
    async getSegmentations () {
      const response = await this.$axios.get('/segment-category-relation')

      if (response.status !== 200) {
        return
      }

      this.segmentations = response.data.data.filter(el => Number(el.segment_id))
    },

    download (data) {
      const fileURL = window.URL.createObjectURL(new Blob([data]))
      const fileLink = document.createElement('a')

      fileLink.href = fileURL
      fileLink.setAttribute('download', 'file.pdf')
      document.body.appendChild(fileLink)
      fileLink.click()
    }
  }
}
</script>

<style lang="scss" scoped>
    .lines-segmentation {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        padding: 80px 0 100px;
        width: 100%;
        max-width: calc(1340px - 3rem);
        margin: 0 auto;
        position: relative;

        .title {
            margin: 0 auto;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 40px;
        }

        .description {
            width: 75%;
            margin: 0 auto;
            text-align: center;
            font-weight: 200;
            font-size: 30px;
        }

        .segmentations {
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            z-index: 1;
        }

        .content {
            z-index: 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            @media screen and (max-width: 768px){
                align-items: center;
            }
            h6 {
                font-size: 28px;
                font-weight: 500;
                margin: 0;
                padding: 0;
                z-index: 1;
            }

            .row {
                display: flex;
                gap: 2rem;
                margin: 0;
                position: relative;

                div {
                    width: calc(50% - 1rem);
                    z-index: 1;
                    @media screen and (max-width: 768px){
                        width: 95%;
                        margin: 0 auto;
                        text-align: center;
                    }
                }

                figure {
                    width: calc(50% - 1rem);
                    position: absolute;
                    top: 20px;
                    right: 0;
                    z-index: 0;
                    margin: 0;
                    height: 720px;

                    @media screen and (max-width: 768px){
                        display: none;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
.lines-segmentation {
    .content {
        .row {
            div {
                p, a, ul, li, span, div {
                    margin-top: 1rem;
                    font-weight: 200;
                    font-size: 24px;
                }
            }
        }
    }
}
</style>
