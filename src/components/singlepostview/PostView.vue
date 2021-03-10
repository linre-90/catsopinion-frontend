<template>
    <div class="wrapper">
        <div v-html="view" class="post"></div>
    </div>
</template>

<script>
export default {
    props: { view: String },
};
</script>

<style scoped>
.wrapper {
    margin: auto;
}

.post {
    margin: auto;
}

.post /deep/ img {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    padding-top: 30px;
    padding-bottom: 40px;
    animation: fadeInRightBig;
    animation-duration: 1s;
    animation-iteration-count: 1;
}

.post /deep/ div {
    width: 95%;
    margin: auto;
}

.post /deep/ h1,
.post /deep/ h2,
.post /deep/ h4 {
    font-family: "Oswald", sans-serif;
    text-align: center;
    animation: fadeInRightBig;
    animation-duration: 1s;
    animation-iteration-count: 1;
}

.post /deep/ h1,
.post /deep/ h2 {
    margin-top: 50px;
    margin-bottom: 50px;
}
.post /deep/ h1 {
    font-size: 3rem;
}
.post /deep/ h2 {
    font-size: 2rem;
}

.post /deep/ h4 {
    font-size: 1.35rem;
}

.post /deep/ p {
    font-family: "Lato", "sans-serif";
    width: 95%;
    margin: auto;
    margin-top: 30px;
    line-height: 1.6em;
    font-size: 1.2rem;
}
.post /deep/ ol {
    font-family: "Lato", "sans-serif";
    font-size: 1.2rem;
    padding-inline-start: 10%;
    margin-inline-start: 50px;
    margin-inline-end: 50px;
}

.post /deep/ a:hover {
    color: #67595e;
}

.post /deep/ a:visited {
    color: #67595e;
}

.post /deep/ a {
    color: #e8b4b8;
}

@media only screen and (min-width: 850px) {
    p {
        width: 70%;
        line-height: 1.75em;
    }
}
@media only screen and (min-width: 1350px) {
    div {
        width: 70%;
    }
}
@media only screen and (min-width: 1750px) {
    img {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        display: block;
        padding-top: 30px;
        padding-bottom: 40px;
    }
}
</style>
