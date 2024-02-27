import { Location } from 'react-router-dom';
import { RouterState } from 'redux-first-history';

export default function getPrevPath(router: RouterState) {
    const previousLocations = router.previousLocations?.find(
        (location) => location.location?.key !== router.location?.key,
    );
    return previousLocations?.location as Location;
}
