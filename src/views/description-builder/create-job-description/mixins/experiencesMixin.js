export default {
    created() {
        this.fetchExperiences();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchExperiences() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderExperiencesModule/fetchExperiencesItems"
                );
                await this.$store.dispatch(
                    "DescriptionBuilderExperiencesModule/fetchSets"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        experiences: {
            get: function() {
                return this.$store.getters["DescriptionBuilderExperiencesModule/items"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderExperiencesModule/items", newVal);
            },
        },
        experiencesSets: {
            get: function() {
                return this.$store.getters["DescriptionBuilderExperiencesModule/sets"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderExperiencesModule/sets", newVal);
            },
        },
    },
};