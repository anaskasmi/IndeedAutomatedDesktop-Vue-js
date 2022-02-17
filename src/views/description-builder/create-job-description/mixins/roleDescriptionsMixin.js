export default {
    created() {
        this.fetchRoleDescriptions();
    },
    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async fetchRoleDescriptions() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderRoleDescriptionsModule/fetchRoleDescriptions"
                );
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
    computed: {
        roleDescriptions: {
            get: function() {
                return this.$store.getters[
                    "DescriptionBuilderRoleDescriptionsModule/roleDescriptions"
                ];
            },
            set: function(newVal) {
                this.$store.commit(
                    "DescriptionBuilderRoleDescriptionsModule/roleDescriptions",
                    newVal
                );
            },
        },
    }
};