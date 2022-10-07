<template>
  <article v-click-outside="handleOutside" :class="{opened: toggleEvent}">
    <h2>{{ data.title }}</h2>
    <span class="toggle" :class="{opened: toggleEvent}" @click="toggleEvent = !toggleEvent" />
    <div class="info">
      <span>{{ date }}</span>
      <hr>
      <span>{{ data.place }}</span>
    </div>
    <transition name="fade">
      <div v-if="toggleEvent" class="event">
        <div class="data">
          <figure>
            <nuxt-img
              v-if="data.image"
              preload
              format="webp"
              :src="data.image"
              alt="event_image"
              quality="100"
              sizes="xs:1024 md:1366 lg:1920"
            />
          </figure>
          <span>{{ data.description }}</span>
        </div>
        <div class="buttons">
          <button @click="goTo(data.event_link)">
            Event Link
          </button>
        </div>
      </div>
    </transition>
  </article>
</template>

<script>
export default {

  components: {
    // vueAddToCalendar
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      toggleEvent: false
    }
  },

  computed: {
    date () {
      const initDate = this.formatDate(this.data.start_date)
      const endDate = this.formatDate(this.data.end_date)

      if (initDate === endDate) {
        return initDate
      }

      if (initDate.split(' ')[0] !== endDate.split(' ')[0]) {
        return `${initDate.split(' ').splice(2, 1).join` `} - ${endDate.split(' ').splice(2, 1).join` `} ${endDate.split(' ')[2]}`
      }

      if (initDate.split(' ')[0] === endDate.split(' ')[0] && initDate.split(' ')[1] !== endDate.split(' ')[1]) {
        return `${initDate.split(' ')[1].replace(',', '')} - ${endDate.split(' ')[1].replace(',', '')} ${endDate.split(' ')[0]} ${endDate.split(' ')[2]}`
      }

      return `${initDate} - ${endDate}`
    }
  },

  methods: {
    handleOutside () {
      this.toggleEvent = false
    },
    formatDate (date) {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },

    formatTime (date) {
      return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    },

    goTo (link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>

    .fade-enter-active {
        animation: fade 0.5s forwards;
    }
    .fade-leave-active {
        animation: fade 0.5s reverse forwards;
    }

    article {
        border: solid 1px #D4D4D4;
        border-radius: 4px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        max-height: 150px;
        transition: 0.5s;

        &.opened {
            max-height: 5000px;

            h2 {
                display: flex;
            }
        }

        h2 {
            font-weight: 500;
            font-size: 2rem;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            width: 85%;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }

        .toggle {
            position: absolute;
            top: 40px;
            right: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 20px;
            height: 20px;

            &::before {
                content: '';
                position: absolute;
                width: 20px;
                height: 1px;
                background: grey;
            }
            &::after {
                content: '';
                position: absolute;
                width: 1px;
                height: 20px;
                background: grey;
                transition: 0.2s;
            }

            &.opened {
                &::after {
                    width: 1px;
                    height: 0px;
                }
            }
        }

        .info {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            @media screen and (max-width: 778px){
                font-size: 0.8rem;
            }

            hr {
                width: 1px;
                height: 1rem;
                background: #D4D4D4;
                border: none;
                margin: 0;
            }
            span {
                color: grey;
            }
        }

        .event {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 3rem;

            .data {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1rem;

                figure {
                    width: 70%;
                    height: 300px;

                    @media screen and (max-width: 992px) {
                        width: 100%;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                span {
                    width: 70%;
                    @media screen and (max-width: 992px) {
                        width: 100%;
                    }
                }
            }

            .buttons {
                display: flex;
                gap: 1rem;

                button {
                    padding: 10px 30px;
                    font-weight: 500;
                    border: solid 1px black;
                    background: none;
                    border-radius: 4px;
                    transition: 0.2s;

                    &:hover {
                        border: solid 1px transparent;
                        background: black;
                        color: white;
                    }

                    &.google {
                        border: none;
                        text-decoration: underline;
                        &:hover {
                            border: none;
                            background: none;
                            color: #25282ad3;
                        }
                    }
                }
            }

        }
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
