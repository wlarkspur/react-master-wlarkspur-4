import { Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ITodo } from "../atoms";

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
interface IBoardProps {
  toDos?: ITodo[];
  boardId: string;
}
const Wrapper = styled.div``;

const Area = styled.div<IAreaProps>`
  display: flex;
  margin: 0 0 10px 0;
  width: 500px;
  height: 100px;
  background-color: white;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  span {
    color: red;
    position: fixed;
    font-weight: 700;
  }
`;

function DeleteBoard({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Droppable droppableId={boardId} type="BOARD">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <span>DELETE BOARD</span>
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DeleteBoard;
