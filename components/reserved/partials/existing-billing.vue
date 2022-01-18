<template>
    <section class="existing-billing" :class="{ active : active }" @click="makeDefault()">
        <label class=" name">
            <input :id="data.id" type="radio" name="radio">
            <span class="checkmark"></span>
            {{data.number}}
        </label>
        <div class="buttons">
            <button @click="removeBilling">{{ $t('reserved.remove_address') }}</button>
        </div>
    </section>
</template>

<script>
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
            active: false
        }
    },
    methods: {
        makeDefault(){
            this.active = true
        },
        removeBilling(){

        }
    }
}
</script>
<style lang="scss" scoped>
    .existing-billing {
        border: 1px solid rgba($black, .4);
        border-radius: 4px;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;

        &.active {
            border: 1px solid $black;
        }

        .name {
            width: 20%;
            display: flex;
            align-items: center;
            gap: 1rem;

            label {
                @extend .text;
                color: $black;
                font-weight: bold;

                p {
                    font-weight: 400;
                }
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            width: fit-content;
            gap: 1rem;

            button {
                @extend .md-text;
                color: $black;
                text-decoration: underline;
                font-weight: 500;
            }
        }
    }
.name {
  display: flex;
  padding-left: 2rem;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}

.name input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  height: 20px;
  width: 20px;
  border: 1px solid $black;
  border-radius: 50%;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.name input:checked ~ .checkmark:after {
  display: block;
}

.name .checkmark:after {
 	top: 50%;
	left: 50%;
    transform: translate(-50%, -50%);
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: $black;
}
</style>