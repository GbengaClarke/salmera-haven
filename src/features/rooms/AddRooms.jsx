import styled from "styled-components";
import { Button } from "../../ui/Button";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../ui/Modal";
import CreateRoomForm from "./CreateRoomForm";

const Div = styled.div`
  margin-right: auto;
  font-size: 1.3rem;
`;

function AddRooms() {
  return (
    <Div>
      <Modal>
        <Modal.Open openFor={"add-new"}>
          <Button>
            <IoMdAdd />
            Add new room
          </Button>
        </Modal.Open>

        <Modal.Window openFor={"add-new"}>
          <CreateRoomForm />
        </Modal.Window>
      </Modal>
    </Div>
  );
}

export default AddRooms;
