export default {
    created() {
        this.fetchApplyMethods();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchApplyMethods() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderApplyMethodsModule/fetchApplyMethodsItems"
                );
                await this.$store.dispatch(
                    "DescriptionBuilderApplyMethodsModule/fetchSets"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        applyMethods: {
            get: function() {
                return this.$store.getters["DescriptionBuilderApplyMethodsModule/items"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderApplyMethodsModule/items", newVal);
            },
        },
        applyMethodsSets: {
            get: function() {
                return this.$store.getters["DescriptionBuilderApplyMethodsModule/sets"];
            },
            set: function(newVal) {
                this.$store.commit("DescriptionBuilderApplyMethodsModule/sets", newVal);
            },
        },
    },
};