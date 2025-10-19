import Modal from "../Modal";

import FormSearchRegistryAccess from "@/components/Forms/RegistryAccess/FormSearchRegistryAccess";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchRegistryAccessModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormSearchRegistryAccess onClose={onClose} />
    </Modal>
  );
};

export default SearchRegistryAccessModal;
