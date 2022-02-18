export default {

    data() {
        return {
            isLoading: false,
        };
    },
    methods: {
        async savePosting() {
            this.isLoading = true;
            try {
                await this.$store.dispatch(
                    "DescriptionBuilderPostingsModule/createPosting",
                    this.job
                );
                this.showSuccessMessage("Saved & Generated successfully");
            } catch (error) {
                this.$swal.fire({
                    title: "Something went wrong, Posting was not saved",
                    message: error.message,
                    icon: "error",
                    type: "error",
                    confirmButtonColor: "#EF6D6D",
                });
            } finally {
                this.collectInfoStepperIsVisible = false;
                this.isLoading = false;
            }
        },

        showSuccessMessage(message = "success") {
            this.$swal.fire({
                title: message,
                icon: "success",
                confirmButtonColor: "#7CD1B8",
            });
        },
    },
    computed: {
        collectInfoStepperIsVisible: {
            get: function() {
                return this.$store.getters[
                    "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible"
                ];
            },
            set: function(newVal) {
                this.$store.commit(
                    "DescriptionBuilderTemplateModule/collectInfoStepperIsVisible",
                    newVal
                );
            },
        },
    },
};