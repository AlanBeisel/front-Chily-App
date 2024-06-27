import OrderCard from '../components/AdminProfile/orders';

const page: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
