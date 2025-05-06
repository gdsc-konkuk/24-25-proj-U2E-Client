import { useEffect } from "react";
import useApi from "../../hooks/useApi";

function Comments() {
  const { fetchTest } = useApi();

  useEffect(() => {
    fetchTest();
  }, []);
  return <div>Comments</div>;
}

export default Comments;
