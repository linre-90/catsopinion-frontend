<template>
    <div >
        <Divider/>
        <LoadingIcon size="large" v-if="this.isLoading && !isError"/>
        <Postview v-if="!isLoading && !isError && view.length > 0" :view="view"/>
        <Divider/>
    </div>
</template>

<script>

import Postview from "../components/singlepostview/PostView";
import LoadingIcon from "../components/loadingIcon/LoadinIcon";
import Divider from "../components/pageComponents/Divider"
import {findById} from "../Queries.js";

export default {
    components:{Postview,LoadingIcon,Divider},
    name: "BlogReaderPage",
    data(){
        return{
            view: "",
            id: "",
            locale:"",
            isLoading: true,
            isError: false
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
        }
    }
}
</script>

<style scoped>

</style>

