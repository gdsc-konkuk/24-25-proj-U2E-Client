import styled from "styled-components";
import UserIcon from "../../assets/svgs/UserIcon.svg?react";
import { colFlex, rowFlex } from "../../styles/flexStyles";
import { useState, useEffect, useRef } from "react";
import { useDeleteCommentMutation } from "../../hooks/useCommentsQuery";

interface CommentCardProps {
  name: string;
  commentId: number;
  newsId: number;
  contents: string;
}

const CommentCard = ({
  name,
  commentId,
  newsId,
  contents,
}: CommentCardProps) => {
  const { mutate: deleteComment, error: deleteError } =
    useDeleteCommentMutation();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLSpanElement>(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        optionRef.current &&
        !optionRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteComment = () => {
    deleteComment({ commentId, newsId });
    setShowPopup(false);
  };

  if (deleteError) {
    alert("댓글 삭제에 실패했습니다.");
  }

  return (
    <Container>
      <HeaderSection>
        <UserName>{name}</UserName>
        <OptionContainer>
          <Option
            ref={optionRef}
            onClick={togglePopup}
            style={{ fontSize: "12px", color: "#A0A0A0" }}
          >
            ...
          </Option>
          {showPopup && (
            <PopupMenu ref={popupRef}>
              <PopupItem onClick={handleDeleteComment}>삭제하기</PopupItem>
            </PopupMenu>
          )}
        </OptionContainer>
      </HeaderSection>

      <CommentSection>
        <UserIcon width={"24px"} height={"24px"} />
        <CommentText>{contents}</CommentText>
      </CommentSection>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 8px 19px;
  gap: 5px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 10px;
  ${colFlex({ justify: "center", align: "start" })}
`;

const HeaderSection = styled.div`
  width: 100%;
  ${rowFlex({ justify: "space", align: "center" })}
`;

const OptionContainer = styled.div`
  position: relative;
`;

const Option = styled.span`
  cursor: pointer;
`;

const PopupMenu = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  width: 80px;
  background: rgba(60, 60, 60, 0.95);
  border-radius: 5px;
  padding: 5px 0;
  z-index: 10;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

const PopupItem = styled.div`
  padding: 8px 12px;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CommentSection = styled.div`
  box-sizing: border-box;
  padding: 5px 0;
  gap: 10px;
  ${rowFlex({ justify: "center", align: "center" })}
`;

const UserName = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CommentText = styled.p`
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  word-break: keep-all;
`;

export default CommentCard;
