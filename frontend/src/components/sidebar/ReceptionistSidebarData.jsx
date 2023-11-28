const receptionistSidebarData = [
    {
        label: 'Panel główny',
        icon: 'bi-grid',
        to: '/dashboard',
    },
    {
        label: 'Klienci',
        icon: 'bi bi-building-fill',
        subitems: [
            {
                label: 'Lista klientów',
                icon: 'bi-circle',
                to: '/customers',
            },
            {
                label: 'Dodaj klienta',
                icon: 'bi-circle',
                to: '/customers/add',
            },

        ],
    },
    {
        label: 'Serwisy i diagnozy',
        icon: 'bi bi-gem',
        subitems: [
            {
                label: 'Do odebrania',
                icon: 'bi-circle',
                to: '/services',
            },
        ],
    },
    {
        label: 'Faktury',
        icon: 'bi bi-pass-fill',
        to: "/invoices"
    },

];
export default receptionistSidebarData;