import Modal from "../Modal";

import FormEditStatusUser from "@/components/Forms/Settings/User/FormEditStatusUser/FormEditStatusUser";
import { ModalTypeItemUser } from "@/types/ModalTypes";
import { User } from "@/types/User";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userSelected: User | undefined;
  onCloseTypeModal: (type: ModalTypeItemUser, error?: string) => void;
};

const ModalEditStatusUser: React.FC<Props> = ({
  isOpen,
  onClose,
  userSelected,
  onCloseTypeModal,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormEditStatusUser user={userSelected} onClose={onCloseTypeModal} />
    </Modal>
  );
};

export default ModalEditStatusUser;
