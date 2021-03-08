<template>
    <div class="container">
        <Divider />
        <LoadinIcon v-if="pageLoading" size="x-large" />
        <h3>{{ $t("formPage.headline") }}</h3>
        <p>
            <i
                ><u>{{ $t("formPage.noSpecialChar") }}</u></i
            >
        </p>
        <p>{{ $t("formPage.requiredItemsInfo") }}</p>
        <form
            v-on:submit.prevent="onSubmit"
            class="animate__animated animate__zoomInUp"
        >
            <table>
                <tr>
                    <td class="alignLeft">
                        <label for="headline">{{
                            $t("formPage.formHeader")
                        }}</label>
                    </td>
                    <td class="alignRigth">
                        <input
                            @keyup="formValid"
                            ref="header"
                            name="headLine"
                            id="headline"
                            type="text"
                            maxlength="20"
                            :placeholder="$t('formPage.headlineplaceholder')"
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td class="alignLeft">
                        <label for="type">{{
                            $t("formPage.typeOfFeedback")
                        }}</label>
                    </td>
                    <td class="alignRigth">
                        <select
                            name="type"
                            class="col-12"
                            id="type"
                            ref="selection"
                            required
                        >
                            <option disabled selected value="">{{
                                $t("formPage.optionsheader")
                            }}</option>
                            <option value="bug">{{
                                $t("formPage.options1")
                            }}</option>
                            <option value="question">{{
                                $t("formPage.options2")
                            }}</option>
                            <option value="other">{{
                                $t("formPage.options3")
                            }}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="alignLeft">
                        <label for="email">{{ $t("formPage.email") }}</label>
                    </td>
                    <td class="alignRigth">
                        <input
                            @keyup="formValid"
                            ref="email"
                            name="email"
                            id="email"
                            type="email"
                            maxlength="254"
                            :placeholder="$t('formPage.emaillaceholder')"
                        />
                    </td>
                </tr>
                <tr>
                    <td class="alignLeft">
                        <label for="message">{{
                            $t("formPage.message")
                        }}</label>
                    </td>
                    <td class="alignRigth">
                        <textarea
                            @keyup="formValid"
                            ref="textArea"
                            name="message"
                            style="resize: none;"
                            class="col-12"
                            id="message"
                            type="text"
                            minlength="20"
                            maxlength="400"
                            rows="10"
                            required
                        ></textarea>
                    </td>
                </tr>
                <tr>
                    <!--honeypot-->
                    <label class="honey" for="name"></label>
                    <input
                        class="honey"
                        type="text"
                        id="name"
                        autocomplete="off"
                        name="name"
                        placeholder="Your name here"
                    />
                </tr>
                <tr>
                    <td colspan="2" class="alignCenter">
                        <button
                            v-bind:class="{
                                subMitFormBtn: true,
                                disabled: !formIsValid,
                            }"
                            v-if="!loading && !submitted"
                            id="subMitFormBtn"
                        >
                            {{ $t("formPage.submitBtn") }}
                        </button>
                        <LoadinIcon v-if="loading" size="medium" />
                    </td>
                </tr>
            </table>

            <h4 id="feedbacktext" class="feedback hidden">
                {{ errormessage }}
                <i id="formSuccessEmoji" class="far fa-smile-beam hidden"></i>
                <i id="formFailedEmoji" class="far fa-sad-tear hidden"></i>
            </h4>
        </form>
        <Divider />
    </div>
</template>

<script>
import Divider from "./Divider";
import axios from "axios";
import LoadinIcon from "@/components/loadingIcon/LoadinIcon";
import joi from "joi";
import { logErrorActivity, logClickActivity } from "../../Logger";

const regex = new RegExp(/^[^<>\\/":;$!';={}&*]+$/);
const messageSchema = joi.object({
    headline: joi
        .string()
        .min(1)
        .max(20)
        .pattern(regex),
    type: joi.string().valid("bug", "question", "other"),
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .pattern(regex)
        .allow(null, ""),
    message: joi
        .string()
        .min(20)
        .max(400)
        .pattern(regex),
});

export default {
    name: "contact-page",
    components: { Divider, LoadinIcon },
    created: function() {
        this.$store.dispatch("changeActivePage", "contact");
        this.$store.dispatch("toggleBlog", false);
        this.pageLoading = false;
        this.timeStamp = Date.now();
    },
    beforeDestroy() {
        const user = this.$firebase.auth().currentUser;
        if (user) {
            user.delete().catch((error) => console.log(error));
        }
    },
    data() {
        return {
            errormessage: "",
            loading: false,
            submitted: false,
            pageLoading: true,
            formIsValid: false,
            timeStamp: "",
        };
    },
    methods: {
        async onSubmit(e) {
            let fillTime = Date.now();
            if (this.formIsValid) {
                logClickActivity(
                    "constact",
                    this.$i18n.locale,
                    "submit",
                    screen.width
                );
                this.loading = true;
                await this.$firebase
                    .auth()
                    .signInAnonymously()
                    .catch((error) => console.log(error));
                if (await this.$firebase.auth().currentUser) {
                    const axiosData = {
                        headline: e.target.headline.value,
                        type: e.target.type.value,
                        email: e.target.email.value,
                        message: e.target.message.value,
                        name: e.target.name.value,
                        fillTime: Math.floor(
                            (fillTime - this.timeStamp) / 1000
                        ),
                    };
                    axios
                        .post(
                            "https://conw3lll13.execute-api.eu-north-1.amazonaws.com/default/verifyForm",
                            { axiosData }
                        )
                        .then((response) => {
                            if (response.status === 200) {
                                const db = this.$firebase.firestore();
                                db.collection("messages")
                                    .add({
                                        headline: axiosData.headline,
                                        type: axiosData.type,
                                        email: axiosData.email,
                                        message: axiosData.message,
                                        name: axiosData.name,
                                        date:
                                            new Date().getDate() +
                                            "/" +
                                            (new Date().getMonth() + 1) +
                                            "/" +
                                            new Date().getFullYear(),
                                    })
                                    .then((docRef) => {
                                        if (docRef.id) {
                                            this.loading = false;
                                            this.submitted = true;
                                            this.errormessage = this.$t(
                                                "formPage.formSucces"
                                            );
                                            document
                                                .getElementById("feedbacktext")
                                                .classList.remove("failed");
                                            document
                                                .getElementById("feedbacktext")
                                                .classList.add("succes");
                                            document
                                                .getElementById("feedbacktext")
                                                .classList.remove("hidden");
                                            document
                                                .getElementById(
                                                    "formSuccessEmoji"
                                                )
                                                .classList.remove("hidden");
                                            document
                                                .getElementById(
                                                    "formFailedEmoji"
                                                )
                                                .classList.add("hidden");
                                        }
                                    })
                                    .catch((error) => {
                                        logErrorActivity(
                                            "contact",
                                            this.$i18n.locale,
                                            "submit",
                                            error,
                                            500,
                                            screen.width
                                        );
                                        this.loading = false;
                                        this.errormessage = this.$t(
                                            "formPage.errorWhenSendingMail"
                                        );
                                        document
                                            .getElementById("feedbacktext")
                                            .classList.add("failed");
                                        document
                                            .getElementById("feedbacktext")
                                            .classList.remove("hidden");
                                        document
                                            .getElementById("formFailedEmoji")
                                            .classList.remove("hidden");
                                        document
                                            .getElementById("formSuccessEmoji")
                                            .classList.add("hidden");
                                    });
                            }
                        })
                        .catch((error) => {
                            logErrorActivity(
                                "contact",
                                this.$i18n.locale,
                                "submit",
                                error,
                                500,
                                screen.width
                            );
                            this.loading = false;
                            this.errormessage = this.$t(
                                "formPage.errorInFilling"
                            );
                            document
                                .getElementById("feedbacktext")
                                .classList.add("failed");
                            document
                                .getElementById("feedbacktext")
                                .classList.remove("hidden");
                            document
                                .getElementById("formFailedEmoji")
                                .classList.remove("hidden");
                            document
                                .getElementById("formSuccessEmoji")
                                .classList.add("hidden");
                        });
                }
            }
        },
        formValid: function() {
            const { error, value } = messageSchema.validate(
                {
                    headline: this.$refs.header.value,
                    type: this.$refs.selection.value,
                    email: this.$refs.email.value,
                    message: this.$refs.textArea.value,
                },
                { stripUnknown: true }
            );
            this.formIsValid = !!(!error && value);
        },
    },
};
</script>

<style scoped>
p {
    font-family: "Lato", "sans-serif";
    width: 50%;
}

h3 {
    font-family: "Lato", "sans-serif";
    width: 80%;
}

label {
    font-family: "Lato", "sans-serif";
}

.honey {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    z-index: -1;
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

.succes {
    color: green;
}
.failed {
    color: red;
}

.feedback {
    font-size: 2em;
}

.hidden {
    display: none;
}

table {
    width: 100%;
    margin: auto;
    border-spacing: 0 0.5em;
    border-collapse: separate;
}
form {
    width: 80%;
    margin: auto;
}

.alignLeft {
    text-align: left;
    width: 30%;
}
.alignRigth {
    text-align: right;
    width: 70%;
}
.alignCenter {
    text-align: center;
}

.alignRigth *:not(button) {
    width: 100%;
}
.captchaRow {
    transform: scale(1);
    transform-origin: 0 0;
}

textarea,
input,
select {
    box-shadow: 1px 1px 5px #67595e;
    border: 2px solid #67595e;
    border-radius: 5px;
    font-family: "Lato", "sans-serif";
}
input,
select {
    height: 2em;
}

.subMitFormBtn {
    padding: 10px 20px;
    background-color: var(--helperColor);
    border-radius: 5px;
    cursor: pointer;
}

.subMitFormBtn:hover {
    padding: 10px 20px;
    background-color: var(--highLigthColor);
    animation: rubberBand forwards;
    animation-duration: 1s;
    animation-iteration-count: 1;
}

.disabled {
    opacity: 0.5;
}

@media only screen and (max-width: 1050px) {
    p {
        width: 100%;
    }
    tr,
    td {
        display: block;
    }
    .alignLeft {
        text-align: center;
        width: 100%;
    }
    .alignRigth {
        text-align: center;
        width: 100%;
    }
}
@media only screen and (max-width: 650px) {
    .container {
        width: 90%;
    }

    .captchaRow {
        transform: scale(0.9);
    }
}
@media only screen and (max-width: 520px) {
    .container {
        width: 95%;
    }
    .captchaRow {
        transform: scale(0.85);
    }
    .alignLeft {
        text-align: center;
        width: 90%;
    }
    .alignRigth {
        text-align: center;
        width: 90%;
    }
}
</style>
