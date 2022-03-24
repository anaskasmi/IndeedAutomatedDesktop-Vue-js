export default {
    computed: {
        description() {
            return (
                `${this.getApplyOnlyHtml()}${this.getCompanyCultureHtml()}` +
                `${this.getJobOpeningHtml()}` +
                `${this.getCompanyDescriptionHtml()}` +
                `${this.getCandidateDescriptionHtml()}` +
                `${this.getPositionsHtml()}` +
                `${this.getCompensationsHtml()}` +
                `${this.getIncentivesHtml()}` +
                `${this.getExperiencesHtml()}` +
                `${this.getQualitiesHtml()}` +
                `${this.getHTAHtml()}` +
                `${this.getSignatureHtml()}` +
                `${this.getTagsHtml()}`
            );
        },
    },

    methods: {
        async copyDescription() {
            try {
                await navigator.clipboard.writeText(this.description);
                this.$store.commit("showSuccessNotification", "Copied successfully!");
            } catch (error) {
                this.$store.commit("showErrorNotification", error);
            }
        },
        arrayToList(array) {
            if (array && array.length > 0)
                return array.join(", ").replace(/, ((?:.(?!, ))+)$/, " and $1");
        },
        arrayToListWithSymbol(array) {
            if (array && array.length > 0)
                return array.join(", ").replace(/, ((?:.(?!, ))+)$/, " & $1");
        },
        getApplyOnlyHtml() {
            if (!this.posting.applyOnly) return "";
            let result = "<p><b>";
            result = result + "*Apply only if you ";
            result = result + this.posting.applyOnly;
            result = result + "*</b></p>";
            return result;
        },
        getJobOpeningHtml() {
            if (!this.posting || !this.posting.company || !this.posting.company.name) return "";
            let result = "<p>";
            result = result + "<b>";
            result = result + (this.posting.company.name || "");
            result = result + "</b>";
            result = result + " in ";
            result = result + "<b>";
            result = result + (this.posting.company.city || "");
            result = result + ", ";
            result = result + (this.posting.company.state || "");
            result = result + "</b>";
            result = result + " is seeking ";
            result = result + (this.posting.roleDescription || "");
            result = result + " ";
            result = result + (this.arrayToList(this.posting.positions) || "");
            result = result + ".";
            result = result + "</p>";
            return result;
        },
        getCandidateDescriptionHtml() {
            if (!this.posting.candidateDescription) return "";
            let result = "<p>";
            result = result + "The ideal candidate ";
            result = result + (this.posting.candidateDescription || "");
            result = result + "</p>";
            return result;
        },

        getCompanyDescriptionHtml() {
            if (!this.posting || !this.posting.company || !this.posting.company.name) return "";
            let result = "<p>";
            result = result + "<b>";
            result = result + (this.posting.company.name || "");
            result = result + "</b> is ";
            result = result + (this.posting.company.description || "");
            result = result + ".";
            result = result + "</p>";
            return result;
        },
        getCompanyCultureHtml() {
            if (!this.posting || !this.posting.company || !this.posting.company.culture)
                return "";
            let result = "";
            result = result + "<b>Company culture: </b>";
            result = result + this.posting.company.culture;
            return result;
        },

        getPositionsHtml() {
            if (!this.posting.positions || !this.posting.positions.length) return "";
            let result = "<b>Positions: </b>";
            result = result + "<ul>";
            for (const position of this.posting.positions) {
                result = result + "<li>";
                result = result + position;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getCompensationsHtml() {
            if (!this.posting.compensations || !this.posting.compensations.length) return "";
            let result = "<b>Compensation: </b>";
            result = result + "<ul>";
            for (const compensation of this.posting.compensations) {
                result = result + "<li>";
                result = result + compensation;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getIncentivesHtml() {
            if (!this.posting.incentives || !this.posting.incentives.length) return "";
            let result = "<b>Incentives: </b>";
            result = result + "<ul>";
            for (const incentive of this.posting.incentives) {
                result = result + "<li>";
                result = result + incentive;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getExperiencesHtml() {
            if (!this.posting.experiences || !this.posting.experiences.length) return "";
            let result = "<b>Experiences: </b>";
            result = result + "<ul>";
            for (const experience of this.posting.experiences) {
                result = result + "<li>";
                result = result + experience;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getQualitiesHtml() {
            if (!this.posting.qualities || !this.posting.qualities.length) return "";
            let result = "<b>Qualities: </b>";
            result = result + "<ul>";
            for (const quality of this.posting.qualities) {
                result = result + "<li>";
                result = result + quality;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getHTAHtml() {
            if (!this.posting.applyMethods || !this.posting.applyMethods.length) return "";
            let result = "<b>How To Apply: </b>";

            result = result + "<ul>";
            for (const applyMethod of this.posting.applyMethods) {
                result = result + "<li>";
                result = result + applyMethod;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getSignatureHtml() {
            if (!this.posting.signature || !this.posting.showSignature) return "";
            let result = "<p><b>";
            result = result + this.posting.signature;
            result = result + "</b></p>";
            return result;
        },
        getTagsHtml() {
            if (!this.posting.tags) return "";
            let result = "<p>";
            result = result + this.posting.tags;
            result = result + "</p>";
            return result;
        },
    },
};