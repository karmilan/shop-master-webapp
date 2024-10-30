import Theme from './Theme.json';

// =============================App Colors=============================
export const _Colors = {
    navBar: {
        backgroundColor: Theme.palette.myTheme.secondary.main,
    },

    sideBar: {
        backgroundColor: Theme.palette.myTheme.primary.main,
    },
    commonBgColor: {
        backgroundColor: Theme.palette.myTheme.primary.main,
        // backgroundImage:
        //     "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
    }
};


// =============================App Colors=============================
export const _Router = {
    link: {
        textDecoration: 'none',
        color: Theme.palette.myTheme.common.white
    }
};

// =============================Data Grid=============================
export const _DataGridStyle = {
    backgroundColor: 'transparent',
    color: Theme.palette.myTheme.common.white,

};

// =============================Icon=============================
export const _IconStyle = {
    color: Theme.palette.myTheme.common.white,
};