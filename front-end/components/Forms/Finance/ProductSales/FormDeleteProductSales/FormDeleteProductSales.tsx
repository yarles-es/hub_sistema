import DefaultFormatContainerForm from "../../../DefaultFormatContainerForm";

import Button from "@/components/Buttons/Button";
import { useDeleteProductSales } from "@/hooks/queries/productSales/useDeleteProductSales";
import useAlert from "@/hooks/useAlert";
import { ProductSales } from "@/types/ProductSales";

type Props = {
  onClose: () => void;
  productSales?: ProductSales;
};

const FormDeleteProductSales: React.FC<Props> = ({ onClose, productSales }) => {
  const alert = useAlert();

  const { mutate: deleteProductSales } = useDeleteProductSales({
    onSuccess: () => {
      alert("Venda deletada com sucesso!", "success");
      onClose();
    },
    onError: (error: any) => {
      alert(error.message, "error");
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (productSales) deleteProductSales(productSales.id);
  };

  if (!productSales) {
    alert("Nenhuma venda selecionada para exclusão.", "error");
    onClose();
  }

  return (
    <DefaultFormatContainerForm title="Excluir Mensalidade">
      <form action="#">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6">
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h1 className="mb-4">
                <strong className="text-meta-1 text-lg">Atenção!</strong>
              </h1>
              <p className="text-sm text-gray-400 mb-4">
                Você está prestes a excluir uma venda vinculada ao produto:{" "}
                <strong className="text-meta-1 text-base">
                  {productSales?.produto.nome || "N/A"}
                </strong>{" "}
                no valor de{" "}
                <strong className="text-meta-3 text-base">
                  R$ {productSales?.valorVenda.toFixed(2) || "R$ 0.00"}
                </strong>
                .
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Ao excluir esta venda, o estoque do produto será ajustado
                automaticamente, aumentando a quantidade disponível em estoque.
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Esta ação não pode ser desfeita. Tem certeza de que deseja
                prosseguir?
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="button"
                className="flex w-full lg:w-50 justify-center rounded p-3"
                danger
                onClick={handleDelete}
              >
                Sim
              </Button>
            </div>
          </div>
        </div>
      </form>
    </DefaultFormatContainerForm>
  );
};

export default FormDeleteProductSales;
