export default {
    created() {
        this.fetchTags();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchTags() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderTagsModule/fetchTags"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {

        tags: {
            get: function() {
                return this.$store.getters["DescriptionBuilderTagsModule/tags"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderTagsModule/tags", newVal);
            },
        },
    },
};