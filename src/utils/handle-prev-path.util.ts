import { Location } from 'react-router-dom';
import { RouterState } from 'redux-first-history';

export default function getPrevLocation(router: RouterState) {
    const previousLocations = router.previousLocations?.find(
        (location) => location.location?.key !== router.location?.key,
    );
    const data = previousLocations?.location as Location;
    return data;
}
