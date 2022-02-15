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
    },
};