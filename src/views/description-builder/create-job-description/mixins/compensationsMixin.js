export default {
    created() {
        this.fetchCompensations();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchCompensations() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderCompensationsModule/fetchCompensationsItems"
                );
                await this.$store.dispatch(
                    "DescriptionBuilderCompensationsModule/fetchSets"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        compensations: {
            get: function() {
                return this.$store.getters["DescriptionBuilderCompensationsModule/items"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderCompensationsModule/items", newVal);
            },
        },
        compensationsSets: {
            get: function() {
                return this.$store.getters["DescriptionBuilderCompensationsModule/sets"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderCompensationsModule/sets", newVal);
            },
        },
    },
};