import Modal from "../Modal";

import FormEditUser from "@/components/Forms/Settings/User/FormEditUser/FormEditUser";
import { ModalTypeItemUser } from "@/types/ModalTypes";
import { EditedUserData } from "@/types/User";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: EditedUserData | undefined;
  onCloseTypeModal: (type: ModalTypeItemUser, error?: string) => void;
};

const ModalEditUser: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseTypeModal,
  user,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormEditUser user={user} onClose={onCloseTypeModal} />
    </Modal>
  );
};

export default ModalEditUser;
