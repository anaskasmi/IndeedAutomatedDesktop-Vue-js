import Vue from 'vue'
import Vuex from 'vuex'
import { repostPageModule } from './repostingPage/index';
import { updatePageModule } from './updatePage/index';
import { resumePageModule } from './resumePage/index';
import { invoiceGeneratorModule } from './invoiceGenerator/index';
import { DescriptionBuilderExperiencesModule } from './../views/description-builder/experiences/store/index';
import { DescriptionBuilderPositionsModule } from './../views/description-builder/positions/store/index';
import { DescriptionBuilderCompensationsModule } from './../views/description-builder/compensations/store/index';
import { DescriptionBuilderIncentivesModule } from './../views/description-builder/incentives/store/index';
import { DescriptionBuilderApplyMethodsModule } from './../views/description-builder/apply-methods/store/index';
import { DescriptionBuilderQualitiesModule } from './../views/description-builder/qualities/store/index';
import { DescriptionBuilderTemplateModule } from './../views/description-builder/create-job-description/store/index';
import { DescriptionBuilderCompaniesModule } from './../views/description-builder/companies/store/index';
import { DescriptionBuilderTagsModule } from './../views/description-builder/tags/store/index';
import { DescriptionBuilderRoleDescriptionsModule } from './../views/description-builder/roleDescriptions/store/index';
import { DescriptionBuilderPostingsModule } from './../views/description-builder/postings/store/index';
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        BASE_URL: 'http://127.0.0.1:3009/api',
        snackbar: {
            isVisible: false,
            message: "",
            color: ""
        }
    },
    getters: {
        snackbar(state) {
            return state.snackbar;
        }
    },
    mutations: {
        snackbar(state, newVal) {
            state.snackbar = newVal;
        },
        showErrorNotification(state, message) {
            state.snackbar.message = message;
            state.snackbar.isVisible = true;
            state.snackbar.color = "red";
        },
        showSuccessNotification(state, message) {
            state.snackbar.message = message;
            state.snackbar.isVisible = true;
            state.snackbar.color = "green";
        },
        showInfoNotification(state, message) {
            state.snackbar.message = message;
            state.snackbar.isVisible = true;
            state.snackbar.color = "info";
        }
    },
    actions: {},
    modules: {
        repostPageModule,
        updatePageModule,
        resumePageModule,
        invoiceGeneratorModule,
        DescriptionBuilderExperiencesModule,
        DescriptionBuilderPositionsModule,
        DescriptionBuilderCompensationsModule,
        DescriptionBuilderIncentivesModule,
        DescriptionBuilderApplyMethodsModule,
        DescriptionBuilderQualitiesModule,
        DescriptionBuilderTemplateModule,
        DescriptionBuilderCompaniesModule,
        DescriptionBuilderTagsModule,
        DescriptionBuilderRoleDescriptionsModule,
        DescriptionBuilderPostingsModule
    }
});