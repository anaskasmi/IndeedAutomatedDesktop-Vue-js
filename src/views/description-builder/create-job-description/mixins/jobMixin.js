export default {
    computed: {
        job: {
            get: function() {
                return this.$store.getters["DescriptionBuilderTemplateModule/job"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderTemplateModule/job", newVal);
            },
        },
    },
};