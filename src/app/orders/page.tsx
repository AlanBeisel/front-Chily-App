import OrderCard from '../components/AdminProfile/orders';

const page: React.FC = () => {
  return (
    <div className="flex flex-col  min-h-screen bg-white">
      <h1 className="font-mochily size-9 font-normal leading-10 text-center text-red-600">
        ordenes
      </h1>
      <h2 className="font-mochily">ordenes del dia</h2>
      <OrderCard
        image="/burger.jpg"
        name="Product Name"
        price={29.99}
        orderId="12345"
        status="entregada"
      />
    </div>
  );
};

export default page;
