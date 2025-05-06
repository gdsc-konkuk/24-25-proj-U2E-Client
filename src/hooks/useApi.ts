const useApi = () => {
  const fetchTest = async () => {
    const response = await fetch("https://test/comments/");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data fetched from API:", data);
    return data;
  };

  return {
    fetchTest,
  };
};

export default useApi;
