import CrearCupon from "../components/Cupones/createCupon";
import ListaCupones from "../components/Cupones/listaCupones";

const AdminCupones = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Administración de Cupones</h1>
      <CrearCupon />
      <ListaCupones />
    </div>
  );
};

export default AdminCupones;