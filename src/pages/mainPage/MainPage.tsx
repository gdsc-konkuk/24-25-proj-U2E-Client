import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handlePinClick = (locationId: string) => {
    navigate(`/news/${locationId}`);
  };

  return (
    <div>
      {/* three.js globe가 여기 들어가겠죠 */}
      {/* 핀 클릭 이벤트에서 위 함수 호출 */}
    </div>
  );
};

export default MainPage;
