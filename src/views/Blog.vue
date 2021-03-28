<template>
    <div>
        <BlogHeader />
        <Divider />
        <!--Query parameters are emittet from search bar component-->
        <BlogSearchBar v-on:searchPosts="getPostsByQuery" />
        <Divider />
        <h2 v-if="!loading">{{this.searchText}}</h2>
        <LoadinIcon size="x-large" v-if="loading" />
        <h2 v-if="errormessage">{{ errormessage }}</h2>
        <span v-if="posts.length > 0 && !errormessage">
            <BlogContainer
                class="animate__animated animate__zoomIn"
                v-on:searchPosts="readPost"
                v-for="post in posts"
                :key="post.uid"
                :postToShow="{ post }"
                name="blogcont"
            />
        </span>
        <Divider />
    </div>
</template>

<script>
import { findNewest, getByQuery } from "../Queries.js";
import BlogContainer from "../components/blogContainer/BlogContainer";
import BlogHeader from "../components/blogHeader/BlogHeader";
import BlogSearchBar from "../components/blogSearchBar/BlogSearcBar";
import Divider from "../components/pageComponents/Divider";
import LoadinIcon from "@/components/loadingIcon/LoadinIcon";
import { logPageActivity, logClickActivity, logErrorActivity } from "../Logger";

export default {
    name: "BlogPage",
    components: {
        BlogContainer,
        BlogHeader,
        BlogSearchBar,
        Divider,
        LoadinIcon,
    },
    methods: {
        removeAnimation() {
            setTimeout(() => {
                document.getElementsByName("blogcont").forEach((e) => {
					e.classList.remove("animate__animated");
					e.classList.remove("animate__zoomIn");
                });
            }, 1000);
        },
        getNewestFive: findNewest,
        async getData() {
            const db = this.$firebase.firestore();
            this.errormessage = null;
            this.posts = await this.getNewestFive(db, this.$i18n.locale).catch((error) => {
                    logErrorActivity(
                        "blog",
                        this.$i18n.locale,
                        "created",
                        error,
                        500,
                        screen.width
                    );
                }
            );
            if (this.posts[0] === "error" || this.posts.length < 1) {
                this.loading = false;
                this.errormessage = this.$t("blogsite.errorMessage");
            }
            this.loading = false;
            this.removeAnimation();
        },
        getPostsByQuery: async function(queryParams) {
            // set new query params to store
            this.$store.dispatch("setLastBlogSearch", queryParams);
            this.updateSearchtext();
            this.loading = true;
            this.errormessage = null;
            const db = this.$firebase.firestore();
            this.posts = [];
            this.posts = await getByQuery(db, queryParams, this.$i18n.locale).catch((error) => {
                logErrorActivity("blog", this.$i18n.locale, "getpostsbyquery", error, 500, screen.width);
            });
            if (
                this.posts[0] === "error" ||
                !queryParams.queryType ||
                this.posts.length < 1
            ) {
                this.loading = false;
                this.errormessage = this.$t("blogsite.errorMessage");
            }
            this.removeAnimation();
            this.loading = false;
        },
        updateSearchtext(){
            this.searchText = this.$t("blogsite.searchTermText.start") + this.$store.state.lastBlogQuery.query
        },
        readPost(view) {
            if (view) {
                logClickActivity(
                    "blog",
                    this.$i18n.locale,
                    view.postTitle,
                    screen.width
                );
                this.$router.push({name:"BlogReaderPage", params:{id:view.postId, locale:view.postLocale}});
            } else {
               this.errormessage = this.$t("blogsite.errorMessage");
            }
        },
    },
    data() {
        return {
            posts: [],
            errormessage: null,
            loading: false,
            searchText:  this.$t("blogsite.searchTermText.start") + this.$t("blogsite.searchTermText.default")
        };
    },
    created() {
        this.loading = true;
        this.$store.dispatch("toggleBlog", true);
        logPageActivity("blog", this.$i18n.locale, screen.width);
        // we do blog post search based on users history
        // if user has not yet searched anything store variable would be null
        // if user has searched posts we save last query param to this store variable and 
        // do query by that
        if(this.$store.state.lastBlogQuery === null){
            this.getData();
        }else{
            this.updateSearchtext();
            this.getPostsByQuery(this.$store.state.lastBlogQuery);
        }
        
    },
    beforeDestroy() {
        this.$store.dispatch("toggleBlog", false);
    },
    metaInfo() {
        return {
            titleTemplate: "%s | " + this.$t("metadata.blog.title"),
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$t("metadata.blog.description"),
                },
            ],
        };
    }
};
</script>

<style scoped>
	h2 {
		text-align: center;
	}
</style>
