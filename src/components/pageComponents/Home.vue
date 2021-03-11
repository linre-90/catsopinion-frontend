<template>
    <div>
        <div class="container">
            <Divider />
            <h2 class="animate__animated animate__backInUp">
                {{ $t("home.headline") }}
            </h2>
            <p>{{ $t("home.p1") }}</p>
            <p>{{ $t("home.p2") }}</p>
            <p>{{ $t("home.p3") }}</p>
            <p>{{ $t("home.p4") }}</p>
            <h4>{{ $t("home.h4") }}</h4>
            <h4>
                {{ $t("home.signature") }}
                <i
                    class="fas fa-paw animate__animated animate__bounceIn animate__repeat-3"
                ></i>
            </h4>
            <Divider />
            <HotNews />
            <Divider />
        </div>
    </div>
</template>

<script>
import Divider from "./Divider";
import HotNews from "../HotNews/Hotnews";

export default {
    name: "homepage",
    components: {
        Divider,
        HotNews,
    },
    methods: {},
    created: function() {
        this.$store.dispatch("changeActivePage", "home");
    },
};
</script>

<style scoped>
p {
    font-family: "Lato", "sans-serif";
    width: 50%;
}

.container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: auto;
}

@media only screen and (max-width: 1050px) {
    p {
        width: 70%;
    }
}
@media only screen and (max-width: 1050px) {
    p {
        width: 100%;
    }
}
@media only screen and (max-width: 650px) {
    .container {
        width: 90%;
    }
}
</style>
