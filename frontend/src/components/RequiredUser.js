import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullScreenLoader from './FullScreenLoader';
import { getMeAPI } from '../redux/features/getMeAPI';
import { getToken } from '../helper/helper';

const RequiredUser = () => {
    const token = getToken();
    const location = useLocation();
    const { isLoading, isFetching } = getMeAPI.endpoints.getMe.useQuery(null, {
        skip: false,
        refetchOnMountOrArgChange: true,
    });

    const loading = isLoading || isFetching;

    const user = getMeAPI.endpoints.getMe.useQueryState(null, {
        selectFromResult: ({ data }) => data,
    });

    if (loading) {
        return <FullScreenLoader />;
    }

    return token || user ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequiredUser;
