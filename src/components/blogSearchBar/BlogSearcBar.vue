<template>
  <div>
        <h3>{{$t("blogsite.serachbar.searcby")}}</h3>
        <select class="animation__animate animate__jello" v-model="searcTerm" name="seriesSearch" id="seriesSearch">
            <optgroup label="Time">
                <option value="Newest">{{$t("blogsite.serachbar.newest")}}</option>
                <option value="Oldest">{{$t("blogsite.serachbar.oldest")}}</option>
            </optgroup>
            <optgroup label="Series">
                <option v-for="entry in this.series" :key="entry" :value="entry">{{entry}}</option>
            </optgroup>
        </select>
        <button v-on:click="$emit('searchPosts', {query:searcTerm, queryType:findParent(searcTerm)})">{{$t("blogsite.serachbar.button")}}</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            series: ["Personal"],
            searcTerm: "Newest"
        }
    },methods:{
        findParent(value){
            let queryType;
            document.getElementsByTagName("option").forEach(e => {
                if(e.value === value){
                    queryType = e.parentNode.label;
                }
            });
            return queryType
        }
    }
}
</script>

<style scoped>
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #E8B4B8;
        height: 80px;
    }
    h3{
        display: inline-block;
        padding: 10px;
        margin-right:30px;
        margin-left:30px;
        margin-top: 0;
        margin-bottom: 0;
    }
    select, button{
        background-color: #67595E;
        border: none;
        font-family: "Lato", "sans-serif";
        border-radius: 20px;
        font-size: 1em;
        margin-right:30px;
        margin-left:30px;
        color: #EED6D3;
        padding: 10px;
        padding-left: 15px;
        padding-right: 15px;
        outline: none;
    }
    button:hover{   
        cursor: pointer;
        background-color: #A49393;
        animation: jello;
        animation-duration: 1s;
        animation-iteration-count: 1;


    }
    select:hover{
        cursor: pointer;
    }

    @media only screen and  (max-width: 600px){
        div{
            flex-direction: column;
            height: auto;
        }
        div *{
            margin-top: 0.75em;
            margin-bottom: 0.75em;
        } 
        
    }


</style>