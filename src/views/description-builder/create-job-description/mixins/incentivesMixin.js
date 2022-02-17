export default {
    created() {
        this.fetchIncentives();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchIncentives() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderIncentivesModule/fetchIncentivesItems"
                );
                await this.$store.dispatch(
                    "DescriptionBuilderIncentivesModule/fetchSets"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        incentives: {
            get: function() {
                return this.$store.getters["DescriptionBuilderIncentivesModule/items"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderIncentivesModule/items", newVal);
            },
        },
        incentivesSets: {
            get: function() {
                return this.$store.getters["DescriptionBuilderIncentivesModule/sets"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderIncentivesModule/sets", newVal);
            },
        },
    },
};