import { useState } from "react";
import apiclient  from '../config/apiClient';
import axios from "axios";  // 這裡改成正確導入 axios

export default function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [loading, setLoading] = useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const request = async (...args) => {
    setLoading(true);

    try {
      const url = apiclient.currentBaseUrl() + "api/v1/admin/about";
      const response = await axios.get(url);

      if (response.status === 200) {
        const responseData = response.data;
        setData(responseData);
        setApiError(false);
      } else {
        console.error("About API請求失敗：", response.statusText);
        setApiError(true);
      }
    } catch (error) {
      console.error("About API請求錯誤：", error);
      setApiError(true);
    }

    setLoading(false);
  };

  return { data, apiError, loading, request };
};
