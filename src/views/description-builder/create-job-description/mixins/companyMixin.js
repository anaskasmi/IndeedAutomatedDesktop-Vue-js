export default {
    data() {
        return {
            isLoading: false,
        };
    },
    created() {
        this.fetchCompanies();
    },
    computed: {
        companies: {
            get: function() {
                return this.$store.getters[
                    "DescriptionBuilderCompaniesModule/companies"
                ];
            },
            set: function(newVal) {
                this.$store.commit(
                    "DescriptionBuilderCompaniesModule/companies",
                    newVal
                );
            },
        },
    },
    methods: {
        async fetchCompanies() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderCompaniesModule/fetchCompanies"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};