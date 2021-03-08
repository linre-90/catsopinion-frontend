<template>
    <div class=reportNTop>
       <button v-on:click="backToTop" id="backToTopBtn"><i class="fa fa-arrow-up"></i></button>
    </div>
</template>
<script>

export default {
    name: "BackToTop",
    created(){
        window.addEventListener("scroll", this.checkScroll)
    },
    unmounted(){
        window.removeEventListener("scroll", this.checkScroll)
    },
    methods:{
        backToTop: () =>{
            // safari
            document.body.scrollTop = 0;
            //real browsers
            document.documentElement.scrollTop = 0;
        },
        checkScroll:() => {
            let backToTopBTN = document.getElementById("backToTopBtn");
            if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
                backToTopBTN.style.display = "block";
            }else{
                backToTopBTN.style.display = "none";
            }
        }
    } 
}
</script>
<style scoped>
:root{
    --backgroundColor: #EED6D3;
    --highLigthColor: #E8B4B8;
    --helperColor: #A49393;
    --strongColor: #67595E;
}
.reportNTop{
    position: fixed; 
    bottom: 5%; 
    right: 2%;
    z-index: 99;
    display: flex;
    flex-direction: column;
}

#backToTopBtn{
    display: none; 
    border: none; 
    outline: none; 
    background-color: #67595E;
    color:  #E8B4B8; 
    cursor: pointer; 
    padding: 15px; 
    border-radius: 50%; 
    font-size: 18px; 
    margin: 25px;
}

#backToTopBtn:hover {
    background-color: #a69f98;
    animation: flip;
    animation-iteration-count: 1;
    animation-duration: 1s;
}
</style>