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
  width: 835px;
  height: 80px;
  background-color: #333030;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  span {
    color: white;
    position: fixed;
  }
`;

function Garbage({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Droppable droppableId={boardId} type="CARD">
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <span>Drag items here to delete</span>
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Garbage;
