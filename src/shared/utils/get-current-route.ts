import { Location } from 'react-router';

export const getCurrentRoute = (location: Location) => location.pathname.split('/');
