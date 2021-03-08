<template>
    <div>
        <Divider />
        <div class="cardContainer ">
            <AppCard
                v-for="app in this.appz"
                :key="app.name"
                :name="app.appName"
                :description="app.appDescription"
                :url="app.appurl"
                :image="app.appImage"
            />
        </div>
        <Divider />
    </div>
</template>

<script>
import Divider from "../components/pageComponents/Divider";
import AppCard from "../components/AppCard/AppCard";
import { logPageActivity } from "../Logger";
export default {
    components: {
        Divider,
        AppCard,
    },
    data() {
        return {
            appz: [
                {
                    appName: this.$t("appPage.weatherApp.name"),
                    appurl: "/Weatherapp",
                    appDescription: this.$t("appPage.weatherApp.description"),
                    appImage:
                        "https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=948&q=80",
                },
            ],
        };
    },
    created() {
        this.$store.dispatch("changeActivePage", "appz");
        this.$store.dispatch("toggleBlog", false);
        logPageActivity("appz", this.$i18n.locale, screen.width);
    },
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
};
</script>

<style scoped>
.cardContainer {
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    margin: auto;
}
</style>
