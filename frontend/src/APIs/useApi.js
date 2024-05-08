import { useState } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const executeRequest = async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    let response = { data: null, error: null };
    try {
      response = await apiFunction(...args);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return { loading, error, data, executeRequest };
};

export default useApi;
