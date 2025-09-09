import Modal from "../Modal";

import FormEditClient from "@/components/Forms/Clients/FormEditClient/FormEditClient";
import { Client } from "@/types/Client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCloseAndGetClient: () => void;
  client: Client | undefined;
  refetchClients: () => void;
};

const ModalEditClient: React.FC<Props> = ({
  isOpen,
  onClose,
  onCloseAndGetClient,
  client,
  refetchClients,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormEditClient
        onClose={onCloseAndGetClient}
        client={client}
        refetch={refetchClients}
      />
    </Modal>
  );
};

export default ModalEditClient;
