export default {
    created() {
        this.fetchQualities();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchQualities() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderQualitiesModule/fetchQualitiesItems"
                );
                await this.$store.dispatch(
                    "DescriptionBuilderQualitiesModule/fetchSets"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        qualities: {
            get: function() {
                return this.$store.getters["DescriptionBuilderQualitiesModule/items"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderQualitiesModule/items", newVal);
            },
        },
        qualitiesSets: {
            get: function() {
                return this.$store.getters["DescriptionBuilderQualitiesModule/sets"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderQualitiesModule/sets", newVal);
            },
        },
    },
};