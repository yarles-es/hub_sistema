import Modal from "../Modal";

import FormNewUser from "@/components/Forms/Settings/User/FormNewUser/FormNewUser";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetUsers: () => void;
};

const ModalCreateUser: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetUsers,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormNewUser onClose={onCloseAndGetUsers} />
    </Modal>
  );
};

export default ModalCreateUser;
