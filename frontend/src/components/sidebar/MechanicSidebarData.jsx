const mechanicSidebarData = [
    {
        label: 'Panel główny',
        icon: 'bi-grid',
        to: '/dashboard',
    },
    {
        label: 'Samochody',
        icon: 'bi bi-car-front-fill',
        subitems: [
            {
                label: 'Lista samochodów',
                icon: 'bi-circle',
                to: '/customers/cars',
            },
            {
                label: 'Dodaj samochód',
                icon: 'bi-circle',
                to: '/customers/cars/add',
            },

        ],
    },
    {
        label: 'Diagnozy',
        icon: 'bi bi-clipboard2-pulse-fill',
        subitems: [
            {
                label: 'Lista diagnoz',
                icon: 'bi-circle',
                to: '/diagnoses',
            },
            {
                label: 'Dodaj diagnoze',
                icon: 'bi-circle',
                to: '/diagnoses/add',
            },
        ],
    },
    {
        label: 'Serwisy',
        icon: 'bi bi-gem',
        subitems: [
            {
                label: 'Lista serwisów',
                icon: 'bi-circle',
                to: '/services',
            },
            {
                label: 'Dodaj serwis',
                icon: 'bi-circle',
                to: '/services/add',
            },

        ],
    },

];
export default mechanicSidebarData;