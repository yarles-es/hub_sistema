"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getStatusCliente(isento, vencimentosPendentes, inicioHojeLocal) {
    if (isento) {
        return 'ISENTO';
    }
    const possuiMensalidadeAtrasada = vencimentosPendentes.some(({ vencimento }) => vencimento < inicioHojeLocal);
    return possuiMensalidadeAtrasada ? 'ATRASADO' : 'EM DIA';
}
function printTabela(clientes) {
    const linhas = clientes.map((cliente) => ({
        id: String(cliente.id),
        nome: cliente.nome,
        status: cliente.status,
    }));
    const larguraId = Math.max('ID'.length, ...linhas.map((linha) => linha.id.length));
    const larguraNome = Math.max('NOME'.length, ...linhas.map((linha) => linha.nome.length));
    const larguraStatus = Math.max('STATUS'.length, ...linhas.map((linha) => linha.status.length));
    const formatarLinha = (id, nome, status) => `${id.padEnd(larguraId)} | ${nome.padEnd(larguraNome)} | ${status.padEnd(larguraStatus)}`;
    console.log(formatarLinha('ID', 'NOME', 'STATUS'));
    console.log(`${'-'.repeat(larguraId)}-+-${'-'.repeat(larguraNome)}-+-${'-'.repeat(larguraStatus)}`);
    for (const linha of linhas) {
        console.log(formatarLinha(linha.id, linha.nome, linha.status));
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const inicioHojeLocal = new Date();
        inicioHojeLocal.setHours(0, 0, 0, 0);
        const clientesAtivos = yield prisma.cliente.findMany({
            where: {
                ativo: true,
                OR: [
                    {
                        isento: true,
                    },
                    {
                        Mensalidade: {
                            some: {
                                status: client_1.StatusMensalidade.PENDENTE,
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
                        status: client_1.StatusMensalidade.PENDENTE,
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
    });
}
main()
    .catch((error) => {
    if (error instanceof Error) {
        console.error(`Erro ao listar clientes ativos: ${error.message}`);
    }
    else {
        console.error('Erro ao listar clientes ativos:', error);
    }
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
