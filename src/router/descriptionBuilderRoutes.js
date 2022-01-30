const descriptionBuilderRoutes = [{
        path: 'apply-methods',
        name: 'descriptionBuilder.applyMethods',
        component: () =>
            import ('@/views/description-builder/apply-methods/views/ApplyMethods.vue'),
    },
    {
        path: 'compensation',
        name: 'descriptionBuilder.compensation',
        component: () =>
            import ('@/views/description-builder/compensations/views/Compensation.vue'),
    },
    {
        path: 'experiences',
        name: 'descriptionBuilder.experiences',
        component: () =>
            import ('@/views/description-builder/experiences/views/Experiences.vue'),
    }, {
        path: 'incentives',
        name: 'descriptionBuilder.incentives',
        component: () =>
            import ('@/views/description-builder/incentives/views/Incentives.vue'),
    }, {
        path: 'positions',
        name: 'descriptionBuilder.positions',
        component: () =>
            import ('@/views/description-builder/positions/views/Positions.vue'),
    }, {
        path: 'qualities',
        name: 'descriptionBuilder.qualities',
        component: () =>
            import ('@/views/description-builder/qualities/views/Qualities.vue'),
    }, {
        path: 'tags',
        name: 'descriptionBuilder.tags',
        component: () =>
            import ('@/views/description-builder/tags/views/Tags.vue'),
    },
];

export default descriptionBuilderRoutes;