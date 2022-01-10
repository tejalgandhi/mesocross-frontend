<template>
    <aside>
        <h2>{{$t(data.title)}}</h2>
        <input type="email" name="email" :placeholder="data.label" v-model="form['email']">
        <button class="retangular-button retangular-button__inverted" @click="submit()">{{$t('test')}}</button>
    </aside>
</template>

<script>
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
            form: {}
        }
    },
    methods: {
        async submit(){
            await api.post('forgot-password', this.form)
        }
    }
}
</script>
<style lang="scss" scoped>
    aside {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: $white;
        padding: 2rem;
        width: 33%;

        h2 {
            @extend .xxs-title;
            color: $black;
            text-align: center;
            margin-bottom: 2rem;
        }

        input {
            @extend .text;
            color: $black;
            border: 1px solid $black;
            padding: .75rem;
            border-radius: 3px;
            width: 100%;

            &:focus {
                border: 1px solid $black;
            }

            &::placeholder {
                color: $black;
            }
        }

        .retangular-button {
            width: 100%;
            margin-top: .75rem;
        }
    }
</style>
