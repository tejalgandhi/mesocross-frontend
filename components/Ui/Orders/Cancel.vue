<template>
  <div class="details-container">
    <div class="overlay" @click="$emit('close')" />
    <div class="details">
      <div class="header">
        <h2>{{ $t('cancel') }} #{{ String(data.id).padStart(5, '0') }}</h2>
      </div>
      <div class="items">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <ValidationObserver ref="formObserver">
          <form enctype="multipart/form-data" @submit.prevent="submit">
            <div class="row mb-25">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="cancel_reason">{{ $t('description') }} * </label>
                  <div class="position-relative">
                    <ValidationProvider v-slot="{ errors }" :name="$t('description')" rules="required">
                      <input v-model="form.cancel_reason" type="textarea" :placeholder="$t('description')" class="form-control">
                      <span class="errors text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <b-button block type="submit" variant="primary">
                  {{ $t('Send') }}
                </b-button>
              </div>
            </div>
          </form>
        </validationobserver>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: {
        order_id: '',
        cancel_reason: ''
      },
      file: '',
      formObserver: '',
      errorMessage: ''
    }
  },
  watch: {
    data: {
      immediate: true,
      handler (newData) {
        this.form.order_id = newData.id
      }
    }
  },
  methods: {
    async submit () {
      // eslint-disable-next-line no-unreachable
      try {
        if (await this.$refs.formObserver.validate()) {
          const { data } = await this.$axios.post('cancel-order', this.form)

          if (data.code === 422) {
            this.$toast.error(data.message.file[0], { duration: 5000, position: 'top-right', className: 'custom-toast-error-class' })
          } else {
            this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
            this.$emit('close')
          }
        }
      } catch (error) {
        this.$toast.error('Something went wrong', { duration: 5000, position: 'top-right', className: 'custom-toast-error-class' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 100;
    color: white;

    .overlay {
        position: absolute;
        background: grey;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .details {
        width: 95%;
        height: 95%;
        max-width: 500px;
        max-height: 700px;
        background: rgb(0, 0, 0);
        border-radius: 4px;
        z-index: 1;
        color: rgb(255, 255, 255);

        .header {
            height: 5rem;
            width: 100%;
            border-bottom: solid 1px grey;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            margin: 0;

            h2 {
                font-size: 20px;
                text-transform: uppercase;
                color: rgb(252, 252, 252);
            }

            span {
                font-weight: 100;
                font-size: 12px;
            }

            .close {
                width: 16px;
                height: 16px;
                position: absolute;
                right: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &::before,
                &::after {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 1px;
                    background: black;
                }

                &::after {
                    transform: rotate(45deg);
                }

                &::before {
                    transform: rotate(-45deg);
                }
            }
        }

        .items {
            height: calc(100% - 5rem);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow: auto;

            hr {
                border: none;
                width: 100%;
                height: 1px;
                background: rgba(0, 0, 0, 0.1);
            }

            .form-content{
              .page-title{
                padding: 80px 0;
                @media (max-width:991px) {
                  padding: 40px 0;
                }
              }
            }
              .custom-file-input {
                color: #fff;
                opacity: 1;
                background-color: transparent;
                height: auto;

              }
              .custom-file-input:hover:before {
                color: #000;
              }
        }
    }
}
</style>
