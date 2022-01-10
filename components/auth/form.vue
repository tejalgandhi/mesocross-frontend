<template>
    <form class="form">
        <template v-for="(input, i) in data.form">
            <div v-if="input.type == 'email' || input.type == 'password' || input.type == 'text' || input.type == 'number'" :key="i" class="input-container">
              <label for="">{{input.label}}</label>
              <input :ref="input.name" v-model="form[input.name]" :type="input.type" :name="input.name" required>
              <img v-if="input.type == 'password'" src="/svgs/eye.svg" alt="button" class="show-pass" @click="togglePassword(input.name)">
            </div>
        </template>
        <p v-if="data.policies" class="policies">{{ data.policies }}</p>
        <button v-if="data.forgot_password" class="password" @click="resetPass()">{{ data.forgot_password }}</button>
        <template  v-for="(input, i) in data.form">
          <div v-if="input.type == 'checkbox'" :key="i" class="checkbox-container">
            <label class="checkbox">
                {{ input.label }}
                <input v-model="form[input.name]" :type="input.type" :name="input.name">
                <span class="checkmark"></span>
            </label>
          </div>
        </template>
        <button type="button" class="retangular-button" @click="submit()">{{ data.submit }}</button>
    </form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import api from '../../assets/js/api';
export default {
    props: {
      data: {
        type: Object,
        required: false,
        default: () => {}
    },
  },
  data(){
    return {
      form: {
        type: 1,
        email_marketing: true,
      }
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  watch: {
    getUser(val){
    }
  },
  methods: {
    ...mapMutations({
      setUser: 'user/setUser',
    }),
    async submit(){
      const response = await api.post(this.data.api, this.form)
      this.alertsHandeler(response.data)
      switch (this.data.api) {
        case 'login':
            if(response.data.status){
              this.setUser(response.data.user)
              localStorage.loginToken = response.data.access_token
              this.$router.push({path: '/reserved'})
            }
          break;
      
        case 'regist':
            if(response.data.status){
              this.setUser(response.data.user)
            }
          break;
      };
      // if(this.form.keep_signin) {
      //   localStorage.authData = this.form
      // }
    },
    togglePassword(name){
      if(this.$refs[name][0].type === 'text') this.$refs[name][0].type = 'password'
      else this.$refs[name][0].type = 'text'
    },
    alertsHandeler(data){
      this.$emit('alertHandeler', data.message, data.status)
    },
    resetPass(){
      this.$emit('resetPass')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .input-container {
        display: flex;
        flex-direction: column;
        position: relative;

        label {
            @extend .text;
            color: white;
            margin-bottom: .5rem;
        }

        input {
            width: 100%;
            background-color: $black;
            height: 48px;
            border: 1px solid $white;
            color: $white;
            @extend .text;
            border-radius: 2px;
            padding: 1rem;
            user-select: none;

            &:focus {
                outline: none;
            }
        }

        .show-pass {
          position: absolute;
          right: 12px;
          bottom: 12px;
          cursor: pointer;
        }
    }
}

.password {
    @extend .md-text;
    color: $white;
    text-decoration: underline;
    text-align: right;
}

.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem 2.25rem;

  .checkbox {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    @extend .md-text;
    color: $white;
    font-weight: 500;

    input {
      position: absolute;
      opacity: 0;
      height: 0;
      width: 0;

      &:checked ~ .checkmark {
        background-color: $white;

        &:after {
          display: block;
        }
      }
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 16px;
      width: 16px;
      border: 1px solid $white;
      border-radius: 2px;
      transition: 0.4s;

      // @media (min-width: 1366px) {
      //   height: 20px;
      //   width: 20px;
      // }

      &:after {
        content: "";
        position: absolute;
        display: none;
      }

      &:after {
        left: 5px;
        top: 2px;
        width: 3px;
        height: 7px;
        border: solid $black;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      
        // @media (min-width: 1366px) {
        //   left: 6px;
        //   top: 3px;
        //   width: 4px;
        //   height: 8px;
        // }
      }
    }

    &:hover {
      .checkmark {
        background-color: rgba($white, 0.5);
      }
    }
  }
}

.policies {
  @extend .md-text;
  color: $white;
}
</style>