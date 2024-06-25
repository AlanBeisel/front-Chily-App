// "use cleint"
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Product } from '@/types';



// const ViewCategory: React.FC = () => {
//   const router = useRouter();
//   const { category } = router.query;
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     if (category) {
//       // Fetch or filter products based on the selected categoryID.
//       // This is a placeholder. Replace it with your actual product fetching logic.
//       const fetchedProducts = [
//         {
//           id: 1,
//           name: `Product 1 in category ${category}`,
//           image: '/product1.jpg',
//           price: 10,
//         },
//         {
//           id: 2,
//           name: `Product 2 in category ${category}`,
//           image: '/product2.jpg',
//           price: 20,
//         },
//       ];
//       setProducts(fetchedProducts);
//     }
//   }, [category]);

//   return (
//     <div className="w-full flex justify-center">
//       <main className="flex-grow p-4">
//         <h1 className="text-2xl font-bold mb-4">Categoría: {category}</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <div key={product.id} className="border p-4 rounded-lg">
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="w-full h-40 object-cover mb-2"
//               />
//               <h2 className="text-lg font-bold">{product.name}</h2>
//               <p className="text-gray-600">${product.price}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ViewCategory;
