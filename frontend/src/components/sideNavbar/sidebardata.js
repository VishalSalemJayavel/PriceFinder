import React from 'react'

import HomeIcon from '@mui/icons-material/Home';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const sidebardata = [
    {
        title:"Home",
        icon:<HomeIcon />,
        link:'/'
    },
    {
        title:"Dashboard",
        icon:<DashboardIcon />,
        link:'/'
    },
    {
        title:"Upload Product",
        icon:<UploadFileIcon />,
        link:'/'
    },
    {
        title:"Edit Profile",
        icon:<AccountBoxIcon />,
        link:'/'
    }

]
