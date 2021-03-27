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
        <ProgressBar
            ref="brogBar"
            v-if="!loading"
            :time="15000"
            :barWidth="200"
        />
    </div>
</template>

<script>
import SingleHotNew from "./SinglehotNew";
import LoadingSpinner from "../loadingIcon/LoadinIcon";
import { getHotNews } from "../../Queries";
import ProgressBar from "../ProgressBar/ProgresBar";
export default {
    components: { SingleHotNew, LoadingSpinner, ProgressBar },
    data() {
        {
            return {
                news: [],
                timer: null,
                currentIndex: 0,
                loading: true,
                firstTime: true,
            };
        }
    },

    mounted: function() {
        this.startSlide();
        this.next();
    },
    created() {
        this.getNews();
        this.loading = false;
    },

    methods: {
        startSlide: function() {
            this.timer = setInterval(this.next, 15000);
        },
        next: function() {
            this.currentIndex += 1;
            if (!this.firstTime) {
                this.$refs.brogBar.resetCounter();
            }
            this.firstTime = false;
        },
		getNews: async function() {
            this.news = await getHotNews(
                this.$firebase.firestore(),
                this.$i18n.locale
            );
        },
    },
    computed: {
        current: function() {
            return this.news[Math.abs(this.currentIndex) % this.news.length];
        },
    },
    beforeDestroy() {
        clearInterval(this.timer);
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
