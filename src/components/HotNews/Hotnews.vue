<template>
    <div>
        <h2>{{ $t("hotnews.header") }}</h2>
        <div style="margin:50px"></div>
        <div class="newsContainer">
            <LoadingSpinner v-if="loading" />
            <span v-if="!loading && this.news.length > 0">
                <transition-group name="newsCarousel" tag="div">
                    <div v-for="i in [currentIndex]" :key="i">
                        <SingleHotNew
                            :date="current.date"
                            :headline="current.headline"
                            :message="current.message"
                        />
                    </div>
                </transition-group>
            </span>
        </div>
        <div style="margin:50px"></div>
        <div class="loadingBar">
            <div id="bar"></div>
        </div>
    </div>
</template>

<script>
//TODO fetch news from database and translations
import SingleHotNew from "./SinglehotNew";
import LoadingSpinner from "../loadingIcon/LoadinIcon";
import { getHotNews } from "../../Queries";
export default {
    components: { SingleHotNew, LoadingSpinner },
    data() {
        {
            return {
                news: [],
                timer: null,
                currentIndex: 0,
                loading: true,
            };
        }
    },

    mounted: function() {
        this.startSlide();
        this.next();
    },
    created() {
        /* TODO SHOW SPINNER, load news data*/
        this.getNews();
    },

    methods: {
        startSlide: function() {
            this.timer = setInterval(this.next, 15000);
        },
        next: function() {
            const barr = document.getElementById("bar");
            barr.classList.remove("measureBar");
            void barr.offsetWidth;
            barr.classList.add("measureBar");
            this.currentIndex += 1;
            this.newsTime = 15;
        },
        countDown: function() {
            this.newsTime -= 1;
        },
        getNews: async function() {
            this.news = await getHotNews(
                this.$firebase.firestore(),
                this.$i18n.locale
            );
            this.loading = false;
        },
    },
    computed: {
        current: function() {
            return this.news[Math.abs(this.currentIndex) % this.news.length];
        },
    },
};
</script>

<style scoped>
.newsCarousel-enter-active,
.newsCarousel-leave-active {
    animation: fadeInRight;
    animation-duration: 1s;
    animation-iteration-count: 1;
}
.newsCarousel-enter,
.newsCarousel-leave-to {
    animation: fadeOutLeft;
    animation-duration: 1s;
    animation-iteration-count: 1;
    position: absolute;
}

.newsContainer {
    height: 155px;
}

.loadingBar {
    height: 3px;
    width: 200px;
    background-color: #a49393;
    margin: auto;
    margin-top: 40px;
    opacity: 0.8;
}

.measureBar {
    height: 3px;
    width: 200px;
    background-color: #67595e;
    border-radius: 5px;
    animation: grow;
    animation-duration: 15s;
    animation-iteration-count: 1;
    margin-left: 0;
}

#barFill {
    color: black;
    margin: 0;
    padding: 0;
}

@keyframes grow {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}

@-webkit-keyframes grow {
    0% {
        width: 0%;
    }
    100% {
        width: 100%;
    }
}

@media only screen and (max-width: 600px) {
    .newsContainer {
        height: 250px;
    }
}

@media only screen and (max-width: 1280px) {
    .newsContainer {
        height: 250px;
    }
}
</style>
