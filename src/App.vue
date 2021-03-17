<template>
    <div>
        <Navbar />
        <HeaderCarousel v-if="!this.$store.state.blogActive" />
        <router-view />
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/navBar/Navbar.vue";
import Footer from "@/components/footer/Footer.vue";
import HeaderCarousel from "./components/header/Carousel.vue";

export default {
    name: "App",
    components: { Navbar, Footer, HeaderCarousel },
    metaInfo: {
        title: "Cats Opinion",
        titleTemplate: "%s | Read everything about cats!",
        meta: [
            {
                vmid: "description",
                name: "description",
                content: "default meta!",
            },
        ],
    },
};
</script>

<style>
/*Colors
    --backgroundColor: #EED6D3;
    --highLigthColor: #E8B4B8;
    --helperColor: #A49393;
    --strongColor: #67595E;
*/
body {
    background-color: #eed6d3;
    margin: 0;
}
* {
    box-sizing: border-box;
}

h1,
h2 {
    font-family: "Oswald", sans-serif;
    margin-top: 0;
}

h3,
h4,
p,
label,
a {
    font-family: "Lato", "sans-serif";
}

a,
a:visited {
    color: black;
}

ul {
    padding-inline-start: 0;
    list-style: none;
}

a {
    cursor: pointer;
}
</style>
