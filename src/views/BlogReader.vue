<template>
    <div v-bind:class="{ 'ligth': !darkMode, 'dark': darkMode }">
        <Divider/>
        <BlogReaderSetting v-on:valueChanged="switchModes"/>
        <Divider/>
        <h2 v-if="isError">{{ $t("blogreader.error") }}</h2>
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
import {logErrorActivity} from "../Logger";

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
    metaInfo() {
        return {
            titleTemplate: "%s | " + this.$t("blogreader.title"),
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$t("blogreader.meta"),
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
                this.isError = true;
                logErrorActivity("BlogReader", this.locale, this.id, "error", 404, screen.width);
            }else{
                this.view = this.parseHtml(response[0]);
            }
        },
        switchModes(value){
            this.darkMode = value;
        },
		parseHtml(html){
			let div = document.createElement("div");
			div.innerHTML = html;
			let scripts = div.getElementsByTagName("script");
			let i = scripts.length;
			while (i--){
				scripts[i].parentNode.removeChild(scripts[i]);
			}
			return div.innerHTML;
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

h2{
    text-align: center;
}

</style>

