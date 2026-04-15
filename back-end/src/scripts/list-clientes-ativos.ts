import 'dotenv/config';
import { PrismaClient, StatusMensalidade } from '@prisma/client';

const prisma = new PrismaClient();
type StatusClienteLista = 'EM DIA' | 'ATRASADO' | 'ISENTO';

function getStatusCliente(
  isento: boolean,
  vencimentosPendentes: Array<{ vencimento: Date }>,
  inicioHojeLocal: Date,
): StatusClienteLista {
  if (isento) {
    return 'ISENTO';
  }

  const possuiMensalidadeAtrasada = vencimentosPendentes.some(({ vencimento }) => vencimento < inicioHojeLocal);

  return possuiMensalidadeAtrasada ? 'ATRASADO' : 'EM DIA';
}

function printTabela(clientes: Array<{ id: number; nome: string; status: StatusClienteLista }>) {
  const linhas = clientes.map((cliente) => ({
    id: String(cliente.id),
    nome: cliente.nome,
    status: cliente.status,
  }));

  const larguraId = Math.max('ID'.length, ...linhas.map((linha) => linha.id.length));
  const larguraNome = Math.max('NOME'.length, ...linhas.map((linha) => linha.nome.length));
  const larguraStatus = Math.max('STATUS'.length, ...linhas.map((linha) => linha.status.length));

  const formatarLinha = (id: string, nome: string, status: string) =>
    `${id.padEnd(larguraId)} | ${nome.padEnd(larguraNome)} | ${status.padEnd(larguraStatus)}`;

  console.log(formatarLinha('ID', 'NOME', 'STATUS'));
  console.log(`${'-'.repeat(larguraId)}-+-${'-'.repeat(larguraNome)}-+-${'-'.repeat(larguraStatus)}`);

  for (const linha of linhas) {
    console.log(formatarLinha(linha.id, linha.nome, linha.status));
  }
}

async function main() {
  const inicioHojeLocal = new Date();
  inicioHojeLocal.setHours(0, 0, 0, 0);

  const clientesAtivos = await prisma.cliente.findMany({
    where: {
      ativo: true,
      OR: [
        {
          isento: true,
        },
        {
          Mensalidade: {
            some: {
              status: StatusMensalidade.PENDENTE,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      nome: true,
      isento: true,
      Mensalidade: {
        where: {
          status: StatusMensalidade.PENDENTE,
        },
        select: {
          vencimento: true,
        },
      },
    },
  });

  const clientesOrdenados = [...clientesAtivos]
    .map((cliente) => ({
      id: cliente.id,
      nome: cliente.nome,
      status: getStatusCliente(cliente.isento, cliente.Mensalidade, inicioHojeLocal),
    }))
    .sort((clienteA, clienteB) => clienteA.nome.localeCompare(clienteB.nome, 'pt-BR', { sensitivity: 'base' }));

  if (clientesOrdenados.length === 0) {
    console.log('Nenhum cliente ativo encontrado.');
    return;
  }

  console.log(`Total de clientes ativos: ${clientesOrdenados.length}`);
  printTabela(clientesOrdenados);
}

main()
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(`Erro ao listar clientes ativos: ${error.message}`);
    } else {
      console.error('Erro ao listar clientes ativos:', error);
    }

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
