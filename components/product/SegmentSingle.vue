<template>
    <div class="col-xl col-md col-sm-12">
        <nuxt-link to='' class="segment-single">
            <div class="segment-image">
                <img :src="segment.imgicon" class="img-fluid" alt="" srcset="">
            </div>
            <p class="segment-name" v-html="segment.name"></p>
        </nuxt-link>
    </div>
</template>

<script>
    export default {
        props: {
            segment: {
                type: Object,
                default: {}
                },
            },
    }
</script>

<style lang="scss" scoped>
    .segment-single{
        position: relative;
        text-align: center;   
        @media screen and (max-width:576px){
            display: flex;
            margin: 0 20px 15px 40px;
            align-items: center;
        }         
        .segment-image{
            position: relative;
            display: block;
            width: 50px;
            height: 50px;
            margin-right: 15px;
            @media screen and (min-width:768px){
                width: 100px;
                height: 100px;
                margin: 0 auto;
            }            
            img{
                display: block;
                width: 100%;
                height: auto;
                object-fit: contain;
            }
            &::before{
                position: absolute;
                content: '';
                width:100%;
                height:60%;
                background: rgb(255,255,255);
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%,rgba(0, 0, 0, 0.7) 100%);
                left: 0;
                bottom: 0;
                transition: all ease-in-out 0.2s;
                @media screen and (max-width:576px){
                    content: none;
                }
            }
        } 
        .segment-name{
            position: relative;            
            @media screen and (min-width:768px){
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%); 
            }
            font-size: 16px;
            font-weight: 300;
            color: #ffffff;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            text-decoration: none;            
            &:hover{
                color: #ffffff;
            }
        }
        &:hover{
            .segment-image::before{
                height: 100%    ;
                background: rgb(255,255,255);
                background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%,rgba(0, 0, 0, 0.7) 100%);
            }
        }
    } 
</style>