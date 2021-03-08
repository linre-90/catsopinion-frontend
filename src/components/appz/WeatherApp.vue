<template>
    <div class="wrapper animate__animated animate__rotateIn">
        <div
            v-bind:class="{ card: true, moveleft: showresults }"
            style="z-index: 1"
            id="resultSectionQuestion"
        >
            <h3>{{ $t("appPage.weatherApp.name") }}</h3>
            <div id="form" class="formStyle ">
                <label for="place">{{
                    $t("appPage.weatherApp.inputHelp")
                }}</label>
                <br />
                <input
                    @keyup="checkTownName"
                    type="text"
                    id="place"
                    placeholder="Seinäjoki"
                    ref="town"
                    required
                />
                <br />
                <button
                    v-if="validTown"
                    :class="{ submitBTNHover: validTown, submitBTN: true }"
                    :disabled="!validTown"
                    @click="getWeather"
                >
                    <i class="fa fa-search-location"></i>
                </button>
                <p class="error">{{ errortext }}</p>
            </div>
        </div>
        <div
            ref="resultDiv"
            v-bind:class="{
                card: true,
                hide: !showresults,
                moverigth: showresults,
                movedown: showMobile,
            }"
            id="resultSection"
        >
            <h3>{{ $t("appPage.weatherApp.answerCardHeader") }}</h3>
            <LoadinIcon size="small" v-if="loading" />
            <p class="paragraphHeader">{{ result }}</p>
            <p class="paragraphText">{{ resultText }}</p>
            <p class="paragraphHeader">{{ humidityResult }}</p>
            <p class="paragraphText">{{ humidityResultText }}</p>
            <p class="paragraphHeader">{{ windResult }}</p>
            <p class="paragraphText">{{ windResultResultText }}</p>
            <div>
                <h4 id="catverdict">
                    {{ $t("appPage.weatherApp.catMessageHeader") }}
                    {{ catverdict }}
                </h4>
            </div>
            <a id="minimizeWeather" @click="minimize">{{
                $t("appPage.weatherApp.backBtn")
            }}</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import LoadinIcon from "@/components/loadingIcon/LoadinIcon";
import joi from "joi";
import { logPageActivity, logErrorActivity } from "../../Logger";

const regex = new RegExp(/^[^<>/\\":;$!'={}&*]+$/);
const townSchema = joi
    .string()
    .min(2)
    .pattern(regex);

export default {
    components: {
        LoadinIcon,
    },
    created() {
        logPageActivity("weatherapp", this.$i18n.locale, screen.width);
    },
    data() {
        return {
            enoughText: true,
            result: "",
            resultText: "",
            humidityResult: "",
            humidityResultText: "",
            windResult: "",
            windResultResultText: "",
            showresults: false,
            catverdict: "",
            minimized: false,
            showMobile: false,
            loading: false,
            errortext: "",
            validTown: false,
        };
    },
    methods: {
        checkTownName() {
            const { error, value } = townSchema.validate(
                this.$refs.town.value,
                { stripUnknown: true }
            );
            if (!error && value) {
                this.validTown = true;
            } else {
                this.validTown = false;
            }
        },
        async getWeather() {
            if (this.validTown) {
                this.errortext = "";
                this.loading = true;
                this.setAnimations();
                const response = await axios
                    .post(
                        "https://conw3lll13.execute-api.eu-north-1.amazonaws.com/default/weatherapp",
                        {
                            town: this.$refs.town.value,
                            locale: this.$i18n.locale,
                        }
                    )
                    .catch((error) => {
                        logErrorActivity(
                            "weatherapp",
                            this.$i18n.locale,
                            "getweather",
                            error,
                            404,
                            screen.width
                        );
                        this.errortext = this.$t(
                            "appPage.weatherApp.errormessage"
                        );
                        this.loading = false;
                        this.showresults = false;
                    });
                if (response !== undefined && response) {
                    if (response.status === 200) {
                        this.result =
                            this.$t("appPage.weatherApp.result") +
                            response.data.temp.temperature +
                            this.$t("appPage.weatherApp.resultType");
                        this.resultText = response.data.temp.message;
                        this.humidityResult =
                            this.$t("appPage.weatherApp.humidity") +
                            response.data.humidity.humidityProsent +
                            this.$t("appPage.weatherApp.humidityType");
                        this.humidityResultText =
                            response.data.humidity.message;
                        this.windResult =
                            this.$t("appPage.weatherApp.wind") +
                            response.data.wind.windSpeed +
                            this.$t("appPage.weatherApp.windType");
                        this.windResultResultText = response.data.wind.message;
                        this.catverdict = response.data.catMessage.message;
                        this.loading = false;
                    }
                }
            }
        },
        minimize() {
            this.$refs.resultDiv.style.display = "none";
            this.showMobile = false;
            this.showresults = false;
            this.result = "";
            this.resultText = "";
            this.humidityResult = "";
            this.humidityResultText = "";
            this.windResult = "";
            this.windResultResultText = "";
            this.catverdict = "";
        },
        setAnimations() {
            if (screen.width > 1150) {
                this.showresults = true;
                this.showMobile = false;
            } else {
                this.$refs.resultDiv.style.display = "block";
                this.showresults = false;
                this.showMobile = true;
            }
        },
    },
};
</script>

<style scoped>
h1,
h4,
h3 {
    font-family: "Oswald", sans-serif;
}

p {
    font-family: "Lato", "sans-serif";
}

.error {
    color: #e8b4b8;
    animation: pulse;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    font-size: 1.5em;
}

.card {
    background-color: #a49393;
    padding: 3%;
    border-radius: 20px;
    text-align: center;
    box-shadow: 5px 5px 15px black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 20px auto;
    width: 500px;
    display: inline-block;
    height: 600px;
    transform-origin: center;
}

a {
    text-decoration: underline;
}

a:hover {
    cursor: pointer;
}

.wrapper {
    padding: 0 1%;
    text-align: center;
    position: relative;
    height: 700px;
}

.formStyle input {
    margin-bottom: 5%;
    margin-top: 5%;
}

.hide {
    display: none;
}

.paragraphText {
    font-style: italic;
}
.paragraphHeader {
    font-weight: bold;
}

input {
    width: 40%;
    border-radius: 5px;
    height: 2em;
    box-shadow: 1px 1px 5px #8c6057;
    border: 2px solid #8c6057;
    font-family: "Lato", "sans-serif";
}

.submitBTN {
    background-color: #e8b4b8;
    color: #f0f2ef;
    font-size: 2.5em;
    border-radius: 50%;
    padding: 10px;
    border: 1px solid black;
}

.submitBTN i {
    color: #a49393;
}

.submitBTN:disabled {
    background-color: gray;
}

.submitBTNHover:hover {
    cursor: pointer;
    background-color: #eed6d3;
}

@keyframes MoveLeft {
    0% {
        transform: translate(-50%, -50%);
    }
    100% {
        transform: translate(-560px, -50%);
    }
}

.moveleft {
    animation: MoveLeft forwards;
    animation-duration: 2s;
    animation-iteration-count: 1;
}

@keyframes MoveRigth {
    0% {
        transform: translate(-50%, -50%);
        opacity: 0;
    }
    100% {
        transform: translate(60px, -50%);
        opacity: 1;
    }
}

.moverigth {
    animation: MoveRigth forwards;
    animation-duration: 2s;
    animation-iteration-count: 1;
}

/*mobile slide down answer card*/
.movedown {
    animation: slideInDown forwards;
    animation-duration: 2s;
    animation-iteration-count: 1;
}

/********************responsity media queries****************************/

@media only screen and (max-width: 1150px) {
    .card {
        position: relative;
        width: 50%;
        display: block;
        top: 0;
        left: 0;
        transform: none;
        margin: 20px auto;
        height: auto;
    }
    .wrapper {
        padding: 0 1%;
        text-align: center;
        position: relative;
        height: auto;
        margin: auto;
    }
    .wrapper .card:last-child {
        display: none;
    }
}
@media only screen and (max-width: 650px) {
    .card {
        width: 80%;
    }
}
</style>
