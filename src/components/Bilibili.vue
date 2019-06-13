<template>
    <div>123</div>
</template>

<script>
export default {
    name:'Bilibli',
    data(){
        return{

        }
    },
    mounted(){
        this.$axios.get(
            'https://www.tianqiapi.com/api/'
        ).then(
            res=>{
                console.log(JSON.parse(res.data.split('</b><br />')[1]))
            }
        )
    }

}
</script>
