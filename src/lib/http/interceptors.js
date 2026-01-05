export const setupInterceptors = (client) => {
  client.interceptors.request.use(config => config);
  client.interceptors.response.use(response => response);
};