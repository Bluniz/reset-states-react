import axios from "axios";
import { ProductInfo } from "./ProductInfo";
import { useEffect, useState } from "react";

export const ProductPage = () => {
  const [productId, setProductId] = useState();
  const [productList, setProductList] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/`);
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [productId]);

  if (!productList) return <p>loading...</p>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {productList.map((product) => {
          return (
            <li key={product.id}>
              <p>{product?.name}</p>
              <button onClick={() => setProductId(product.id)}>Ver</button>
            </li>
          );
        })}
      </ul>

      <hr />

      {productId && <ProductInfo productId={productId} key={productId} />}
    </div>
  );
};
