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
            if (!this.postings.applyOnly) return "";
            let result = "<p><b>";
            result = result + "*Apply only if you ";
            result = result + this.postings.applyOnly;
            result = result + "*</b></p>";
            return result;
        },
        getJobOpeningHtml() {
            if (!this.postings || !this.postings.company || !this.postings.company.name) return "";
            let result = "<p>";
            result = result + "<b>";
            result = result + (this.postings.company.name || "");
            result = result + "</b>";
            result = result + " in ";
            result = result + "<b>";
            result = result + (this.postings.company.city || "");
            result = result + ", ";
            result = result + (this.postings.company.state || "");
            result = result + "</b>";
            result = result + " is seeking ";
            result = result + (this.postings.roleDescription || "");
            result = result + " ";
            result = result + (this.arrayToList(this.postings.positions) || "");
            result = result + ".";
            result = result + "</p>";
            return result;
        },
        getCandidateDescriptionHtml() {
            if (!this.postings.candidateDescription) return "";
            let result = "<p>";
            result = result + "The ideal candidate ";
            result = result + (this.postings.candidateDescription || "");
            result = result + "</p>";
            return result;
        },

        getCompanyDescriptionHtml() {
            if (!this.postings || !this.postings.company || !this.postings.company.name) return "";
            let result = "<p>";
            result = result + "<b>";
            result = result + (this.postings.company.name || "");
            result = result + "</b> is ";
            result = result + (this.postings.company.description || "");
            result = result + ".";
            result = result + "</p>";
            return result;
        },
        getCompanyCultureHtml() {
            if (!this.postings || !this.postings.company || !this.postings.company.culture)
                return "";
            let result = "";
            result = result + "<b>Company culture: </b>";
            result = result + this.postings.company.culture;
            return result;
        },

        getPositionsHtml() {
            if (!this.postings.positions || !this.postings.positions.length) return "";
            let result = "<b>Positions: </b>";
            result = result + "<ul>";
            for (const position of this.postings.positions) {
                result = result + "<li>";
                result = result + position;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getCompensationsHtml() {
            if (!this.postings.compensations || !this.postings.compensations.length) return "";
            let result = "<b>Compensation: </b>";
            result = result + "<ul>";
            for (const compensation of this.postings.compensations) {
                result = result + "<li>";
                result = result + compensation;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getIncentivesHtml() {
            if (!this.postings.incentives || !this.postings.incentives.length) return "";
            let result = "<b>Incentives: </b>";
            result = result + "<ul>";
            for (const incentive of this.postings.incentives) {
                result = result + "<li>";
                result = result + incentive;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getExperiencesHtml() {
            if (!this.postings.experiences || !this.postings.experiences.length) return "";
            let result = "<b>Experiences: </b>";
            result = result + "<ul>";
            for (const experience of this.postings.experiences) {
                result = result + "<li>";
                result = result + experience;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getQualitiesHtml() {
            if (!this.postings.qualities || !this.postings.qualities.length) return "";
            let result = "<b>Qualities: </b>";
            result = result + "<ul>";
            for (const quality of this.postings.qualities) {
                result = result + "<li>";
                result = result + quality;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getHTAHtml() {
            if (!this.postings.applyMethods || !this.postings.applyMethods.length) return "";
            let result = "<b>How To Apply: </b>";

            result = result + "<ul>";
            for (const applyMethod of this.postings.applyMethods) {
                result = result + "<li>";
                result = result + applyMethod;
                result = result + "</li>";
            }
            result = result + "</ul>";
            return result;
        },
        getSignatureHtml() {
            if (!this.postings.signature || !this.postings.showSignature) return "";
            let result = "<p><b>";
            result = result + this.postings.signature;
            result = result + "</b></p>";
            return result;
        },
        getTagsHtml() {
            if (!this.postings.tags) return "";
            let result = "<p>";
            result = result + this.postings.tags;
            result = result + "</p>";
            return result;
        },
    },
};