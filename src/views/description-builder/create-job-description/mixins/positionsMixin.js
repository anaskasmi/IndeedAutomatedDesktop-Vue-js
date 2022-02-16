export default {
    created() {
        this.fetchPositions();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchPositions() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderPositionsModule/fetchPositionsItems"
                );
                await this.$store.dispatch(
                    "DescriptionBuilderPositionsModule/fetchSets"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        positions: {
            get: function() {
                return this.$store.getters["DescriptionBuilderPositionsModule/items"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderPositionsModule/items", newVal);
            },
        },
        pickedPositions() {
            return this.job.positions;
        },
        positionsSets: {
            get: function() {
                return this.$store.getters["DescriptionBuilderPositionsModule/sets"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderPositionsModule/sets", newVal);
            },
        },
    },
};