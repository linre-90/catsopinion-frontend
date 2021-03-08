<template>
    <div>
        <home class="animate__animated animate__fadeInDown" />
        <CookieBanner
            class=" animate__animated animate__fadeInUp"
            v-if="!this.$store.state.bannerOk"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import home from "../components/pageComponents/Home.vue";
import { logPageActivity } from "../Logger";
import CookieBanner from "../components/CookieBanner/CookieBanner";
export default {
    name: "Home",
    components: {
        home,
        CookieBanner,
    },
    metaInfo() {
        return {
            titleTemplate: "%s | " + this.$t("metadata.home.title"),
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$t("metadata.home.description"),
                },
            ],
        };
    },
    created() {
        this.$store.dispatch("toggleBlog", false);
        logPageActivity("home", this.$i18n.locale, screen.width);
    },
};
</script>
