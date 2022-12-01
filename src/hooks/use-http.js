import { useState } from "react";

const useHttp = (requestFunction) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const requestData = async (bodyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await requestFunction(bodyData);
      setData(data);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return { isLoading, error, data, requestData };
};

export default useHttp;
