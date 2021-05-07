import { useEffect, useState } from "react";

const CustomHook = (httpClient) => {
  const [error, setError] = useState(null);

  //this interceptors will run every time we wrap any component with hoc errorHandler so
  //we have to unmount them

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  //mimic component will unmount or did unmount for clean up.....
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};

export default CustomHook;
