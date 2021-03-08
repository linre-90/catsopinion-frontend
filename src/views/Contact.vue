<template>
    <contact />
</template>

<script>
// @ is an alias to /src
import contact from "../components/pageComponents/Contact_page.vue";
import { logPageActivity } from "../Logger";

export default {
    name: "Contact",
    components: {
        contact,
    },
    metaInfo() {
        return {
            titleTemplate: "%s | " + this.$t("metadata.contact.title"),
            meta: [
                {
                    vmid: "description",
                    name: "description",
                    content: this.$t("metadata.contact.description"),
                },
            ],
        };
    },
    created() {
        logPageActivity("contact", this.$i18n.locale, screen.width);
    },
};
</script>
