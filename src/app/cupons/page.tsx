import RouteGuard from "@/helpers/routeGuard";
import CrearCupon from "../components/Cupones/createCupon";
import ListaCupones from "../components/Cupones/listaCupones";

const AdminCupones = () => {
  return (
    <RouteGuard allowedRoles={['superadmin']}>
      <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Administración de Cupones</h1>
      <CrearCupon />
      <ListaCupones />
    </div>
    </RouteGuard>
  );
};

export default AdminCupones;