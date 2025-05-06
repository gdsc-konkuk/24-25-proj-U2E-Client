import styled from "styled-components";
import UserIcon from "../../assets/svgs/UserIcon.svg?react";
import { colFlex, rowFlex } from "../../styles/flexStyles";

interface CommentCardProps {
  userName: string;
  contents: string;
}

const CommentCard = ({ userName, contents }: CommentCardProps) => {
  return (
    <CommentContainer>
      <HeaderSection>
        <UserName>{userName}</UserName>
        <Option style={{ fontSize: "12px", color: "#A0A0A0" }}>...</Option>
      </HeaderSection>

      <CommentSection>
        <UserIcon width={"24px"} height={"24px"} />
        <CommentText>{contents}</CommentText>
      </CommentSection>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
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

const Option = styled.span`
  cursor: pointer;
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
