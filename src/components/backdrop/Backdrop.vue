<template>
  <div ></div>
</template>

<script>
export default {
    data(){
        return {visible: this.setVisible};
    },
    props:{
        setVisible:{
            default:false,
            type:Boolean
        }
    },
}
</script>

<style scoped>
div{
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

</style>