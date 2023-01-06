import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import { IInput, toDoState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Board from "./Components/Board";
import Garbage from "./Components/DeleteCard";
import DeleteBoard from "./Components/DeleteBoard";
import { useForm, useFormState } from "react-hook-form";
import { text } from "stream/consumers";
import { useState } from "react";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const AddForm = styled.div`
  margin-bottom: 10px;
  display: flex;
  width: 920px;
  justify-content: flex-start;
  align-items: center;
`;
interface IEvent {
  event: string;
}
interface IForm {
  addToDo: string;
}

/* const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    }; */
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ addToDo }: IForm) => {
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [addToDo]: [],
      };
    });
    setValue("addToDo", "");
  };
  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    console.log(info);
    if (!destination) return;
    if (type === "CARD" && destination?.droppableId === source.droppableId) {
      //same board movement
      setToDos((allBoards) => {
        console.log({ ...allBoards });
        console.log(type);
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (
      destination.droppableId !== "Remove" &&
      type === "CARD" &&
      destination.droppableId !== source.droppableId
    ) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        console.log({ ...allBoards[destination.droppableId] });
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
    if (destination.droppableId === "Remove") {
      setToDos((allBoards) => {
        //console.log(allBoards);
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (source.droppableId && destination.droppableId === "Boards") {
      setToDos((allBoards) => {
        const boardList = Object.keys(allBoards);
        const taskObj = boardList[source.index];
        boardList.splice(source.index, 1);
        boardList.splice(destination?.index, 0, taskObj);
        let boards = {};
        boardList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        return {
          ...boards,
        };
      });
    }
    if (destination.droppableId === "DeleteBoard") {
      setToDos((allBoards) => {
        const boardList = Object.keys(allBoards);
        const taskObj = boardList[source.index];
        boardList.splice(source.index, 1);
        console.log(boardList);
        let boards = {};
        boardList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        return {
          ...boards,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Welcome С Новым годом 2023</h1>
      <Wrapper>
        <AddForm>
          <form onSubmit={handleSubmit(onValid)}>
            <input
              type="text"
              {...register("addToDo", {
                required: true,
              })}
              placeholder={`New Board add here :P`}
            />
            <button>ADD</button>
          </form>
        </AddForm>
        <DeleteBoard boardId={"DeleteBoard"} />
        <Garbage boardId={"Remove"} />
        {/* <StyleBtn>ADD</StyleBtn> */}

        <Droppable droppableId="Boards" direction="horizontal" type="BOARD">
          {(
            provided: DroppableProvided,
            {
              isDraggingOver,
              draggingOverWith,
              draggingFromThisWith,
              isUsingPlaceholder,
            }: DroppableStateSnapshot
          ) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                <Board
                  boardId={boardId}
                  key={boardId}
                  toDos={toDos[boardId]}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
