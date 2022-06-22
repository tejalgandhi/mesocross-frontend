<template>
  <article>
    <div class="title main">
      {{ data.name }}
    </div>
    <span class="desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
    <section>
      <div class="side">
        <span class="title">{{ data.title_1 }}</span>
        <span v-html="data.content_1" />
      </div>
      <div class="images">
        <div class="mobile top">
          <span class="before" :style="{display: slider < 40 ? 'hidden' : 'block'}">{{ data.title_1 }}</span>
          <span class="after" :style="{display: slider > 60 ? 'hidden' : 'block'}">{{ data.title_2 }}</span>
        </div>
        <div class="slider" :style="{width: sliderImageWidth ? `${sliderImageWidth + 40}px` : `calc(100% + 40px)`}">
          <div class="extras">
            <span class="bar" :style="{left: `calc(${slider}% - 3px`}" />
            <span class="indicator" :style="{left: `calc(${slider}% - 20px`}" />
          </div>
          <input
            v-model="slider"
            class="slider-btn"
            type="range"
            min="0"
            max="100"
          >
        </div>
        <figure ref="image">
          <img :src="data.image_2" alt="image" @load="checkSliderImageWidth">
        </figure>
        <figure>
          <img :src="data.image" alt="image" :style="{clipPath: `polygon(0 0,${slider}% 0,${slider}% 100%, 0 100%)`}">
        </figure>
      </div>
      <div class="side">
        <span class="title">{{ data.title_2 }}</span>
        <span v-html="data.content_2" />
      </div>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data () {
    return {
      slider: 50,
      sliderImageWidth: undefined
    }
  },

  mounted () {
    window.addEventListener('resize', this.checkSliderImageWidth)
  },

  methods: {
    checkSliderImageWidth () {
      this.sliderImageWidth = this.$refs.image?.getBoundingClientRect().width
      this.slider = 50
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 2rem;

        .title {
            width: 90%;
            font-weight: 600;
            font-size: 2rem;
            text-transform: uppercase;
            &.main {
                text-align: center;
            }
        }

        .desc {
            width: 70%;
            text-align: center;
            margin-bottom: 3rem;
            @media screen and (max-width: 1200px){
                width: 90%;
            }
        }

        section {
            display: flex;
            justify-content: space-between;
            width: 90%;
            gap: 5%;
            max-width: 1600px;

            @media screen and (max-width: 1200px){
                flex-direction: column;
            }

            .side {
                width: 20%;
                display: flex;
                flex-direction: column;
                @media screen and (max-width: 1200px){
                    display: none;
                }

                .title {
                    font-size: 1rem;
                }
            }

            .images {
                width: 70%;
                height: 550px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                @media screen and (max-width: 1200px){
                    order: -1;
                    width: 100%;
                }

                .mobile {
                    display: none;
                    position: absolute;
                    top: -25px;
                    z-index: 5;
                    width: 100%;

                    @media screen and (max-width: 1200px){
                        display: block;
                    }

                    span {
                        position: absolute;
                        top: 0;

                        &.before {
                            left: 0px;
                        }
                        &.after {
                            right: 0px;
                        }
                    }
                }

                .slider {
                    position: absolute;
                    height: 100%;
                    z-index: 2;
                    display: flex;
                    justify-content: center;

                    .extras {
                        width: calc(100% - 40px);
                        position: absolute;
                        height: 100%;
                        z-index: 0;
                        display: flex;
                        align-items: center;

                        .bar {
                            border: none;
                            height: 100%;
                            width: 6px;
                            background: #28252a;
                            position: absolute;
                        }

                        .indicator{
                            position: absolute;
                            height: 40px;
                            width: 40px;
                            background: #28252a;
                            border-radius: 50%;
                            cursor: ew-resize;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            &::before, &::after {
                                content: '';
                                position: absolute;
                                width: 7px;
                                height: 7px;
                                border-top: solid 1px white;
                            }

                            &::before {
                                border-left: solid 1px white;
                                transform: rotate(-45deg);
                                left: 12px;
                            }

                            &::after {
                                border-right: solid 1px white;
                                transform: rotate(45deg);
                                right: 12px;
                            }

                        }
                    }

                    .slider-btn{
                        width: 100%;
                        -webkit-appearance: none;
                        height: 100%;
                        border: none;
                        background-color: transparent;
                        outline: none;
                        z-index: 1;

                        &::-webkit-slider-thumb{
                            -webkit-appearance: none;
                            height: 0px;
                            width: 0px;
                            background: transparent;
                            cursor: ew-resize;
                        }
                    }

                }

                figure {
                    position: absolute;
                    height: 100%;
                    user-select: none;
                    user-drag: none;
                    overflow: hidden;

                    img {
                        background: white;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }

        }
    }
</style>
