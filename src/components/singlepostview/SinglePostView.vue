// TODO this can be removed entirely

<template >
    <div class="raisePost">
            <Divider/>
            <PostView :class="{animate__animated:true, animate__fadeIn:true}" :view="propView" />
            <Divider/>
            <div style="text-align:center"><!--
                <p style="display:inline">Share your thoughs about this post:</p>
                <a class="link"><i class="far fa-thumbs-up"> </i>Pet the kitty!</a>
                <a class="link"><i class="far fa-thumbs-down"></i>Bad kitty!</a>-->
            <a class="link" v-on:click="$emit('searchPosts')" >Close</a>
            </div>
        <Divider/>
            
    </div>
            
</template>

<script>
import PostView from "./PostView";
import Divider from "../pageComponents/Divider"
export default {
    components: {PostView, Divider},
    data(){
        return {viewFromProps: this.propView, show:this.showMe}
    },
    props:{
        propView:{
            type:String,
            default: ""
        }
    }
};
</script>

<style scoped>
.raisePost{
    display: block;
    flex-direction: column;
    /*position: fixed;*/
    width: 85%;
    height: 100%;
    left: 50%;
    top: 0%;
    transform: translate(-50%);
    background-color: var(--helperColor);
    z-index: 101;
    overflow-y: scroll;
    padding: 2%;
}

.showPost{
    display:hide;
}

.loadinGIcon{
    font-size: 3rem;
}

.link{
    cursor: pointer;
    padding: 1rem;
    text-decoration: underline;
    font-style: italic;
    font-size: 1.25rem;
}

p{
    display: inline;
    font-size: 1.25rem;

}

.link:hover{
    color: #E8B4B8;
}
</style>