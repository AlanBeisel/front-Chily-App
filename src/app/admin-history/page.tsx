import RouteGuard from '@/helpers/routeGuard';
import { HistoryOrders } from '../components/AdminProfile/historyOrders';

const page: React.FC = () => {
  return (
    <div>
      <RouteGuard allowedRoles={['admin', 'superadmin']}>
      <HistoryOrders />
      </RouteGuard>
    </div>
  );
};

export default page;
