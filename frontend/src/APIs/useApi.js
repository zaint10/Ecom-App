import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// Configuring global toast notifications using Swal.mixin
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (error) {
      Toast.fire({
        icon: "error",
        title: error.message,
      });

      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  const executeRequest = async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    let response = { data: null, error: null };
    try {
      response = await apiFunction(...args);
      setData(response.data);
      setError(response.error);
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
