<template>
    <div v-bind:class="{ 'ligth': !darkMode, 'dark': darkMode }">
        <Divider/>
        <BlogReaderSetting v-on:valueChanged="switchModes"/>
        <Divider/>
        <LoadingIcon size="large" v-if="this.isLoading && !isError"/>
        <Postview  class="viewClass" v-if="!isLoading && !isError && view.length > 0" :view="view"/>
        <Divider/>
    </div>
</template>

<script>

import Postview from "../components/singlepostview/PostView";
import LoadingIcon from "../components/loadingIcon/LoadinIcon";
import Divider from "../components/pageComponents/Divider"
import BlogReaderSetting from "../components/singlepostview/BlogReaderSetting";
import {findById} from "../Queries.js";

export default {
    components:{Postview,LoadingIcon,Divider,BlogReaderSetting},
    name: "BlogReaderPage",
    data(){
        return{
            view: "",
            id: "",
            locale:"",
            isLoading: true,
            isError: false,
            darkMode:false
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.locale = this.$route.params.locale;
        this.getPost(this.id, this.locale);
        this.$store.dispatch("toggleBlog", false);
        this.$store.dispatch("changeActivePage", "readerblog");
    },
    //TODO change these
    metaInfo() {
        return {
            titleTemplate: "%s | " + this.$t("metadata.appz.title"),
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$t("metadata.appz.description"),
                },
            ],
        };
    },
    methods:{
        async getPost(id, locale){
            const db = this.$firebase.firestore();
            let response  = await findById(db, locale, id);
            this.isLoading = false;
            if(response[0] === "error"){
                // TODO make error
            }else{
                this.view = response[0];
            }
        },
        switchModes(value){
            this.darkMode = value;
        }
    }
}
</script>

<style scoped>

.ligth{
    background-color: #eed6d3;
}
.dark{
    background-color: #A49393;
}

</style>

