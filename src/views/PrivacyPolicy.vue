<template>
    <div class="container">
        <divider />
        <p>{{ $t("privacypolicy.timestamp") }}8.3.2021</p>
        <PrivacyItem
            :headline="$t('privacypolicy.item1.headline')"
            :text="$t('privacypolicy.item1.text')"
            :quote="$t('privacypolicy.item1.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item2.headline')"
            :text="$t('privacypolicy.item2.text')"
            :quote="$t('privacypolicy.item2.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item3.headline')"
            :text="$t('privacypolicy.item3.text')"
            :quote="$t('privacypolicy.item3.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item4.headline')"
            :text="$t('privacypolicy.item4.text')"
            :quote="$t('privacypolicy.item4.quote')"
        />
        <PrivacyItem
            :headline="$t('privacypolicy.item6.headline')"
            :text="$t('privacypolicy.item6.text')"
            :quote="$t('privacypolicy.item6.quote')"
        />

        <divider />
    </div>
</template>

<script>
import PrivacyItem from "@/components/pageComponents/PrivacyItem";
import Divider from "@/components/pageComponents/Divider";
import { logPageActivity } from "../Logger";
export default {
    name: "PrivacyPolicy",
    components: { Divider, PrivacyItem },
    created: function() {
        this.$store.dispatch("changeActivePage", "privacypolicy");
        this.$store.dispatch("toggleBlog", false);
        logPageActivity("privacypolicy", this.$i18n.locale, screen.width);
    },
    metaInfo() {
        return {
            titleTemplate: "%s | " + this.$t("metadata.privacypolicy.title"),
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$t("metadata.privacypolicy.description"),
                },
            ],
        };
    },
};
</script>

<style scoped>
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
