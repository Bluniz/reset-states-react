/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const ProductInfo = ({ productId }) => {
  const [productInfo, setProductInfo] = useState({});
  const [newAvaliation, setNewAvaliation] = useState("");

  const getProductInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      setProductInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  const onSubmitNewAvaliation = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${productId}`,
        {
          ...productInfo,
          avaliations: [
            ...productInfo.avaliations,
            {
              id: productInfo.avaliations.length + 1,
              message: newAvaliation,
            },
          ],
        }
      );
      setProductInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, [productId, getProductInfo]);

  return (
    <div>
      <h1>Nome: {productInfo?.name}</h1>
      <h2>Preço: {productInfo?.price}</h2>
      <p>Em estoque: {productInfo?.inStock}</p>
      <p>Vendedor: {ProductInfo?.seller}</p>
      <h3>Avaliations</h3>
      <ul>
        {productInfo?.avaliations?.map((avaliation) => {
          return <li key={avaliation.id}>{avaliation.message}</li>;
        })}
      </ul>

      <input
        type="text"
        placeholder="Deixe uma avaliação"
        value={newAvaliation}
        onChange={(e) => setNewAvaliation(e.target.value)}
      />
      <button onClick={onSubmitNewAvaliation}>Avaliar</button>
    </div>
  );
};
