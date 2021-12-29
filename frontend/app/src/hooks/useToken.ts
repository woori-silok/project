const useToken = (): string | null => {
  return localStorage.getItem('woori-silok-jwt');
};

export default useToken;
