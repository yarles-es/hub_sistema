import { Router } from 'express';
import { Container } from 'typedi';
import { CatracaController } from '../controllers/catraca.controller';

const router = Router();

const catracaController = Container.get(CatracaController);

router.get('/id-disponivel', catracaController.buscarIdDisponivel.bind(catracaController));

router.get('/cadastro-biometria', catracaController.getCadastroBiometria.bind(catracaController));

router.get('/buscar-mensagens', catracaController.buscarMensagens.bind(catracaController));

router.get('/buscar-duracao-interacao', catracaController.buscarDuracaoInteracao.bind(catracaController));

router.post('/webhook', catracaController.webhook.bind(catracaController));

router.post('/iniciar-cadastro', catracaController.iniciarCadastroBiometria.bind(catracaController));

router.post('/cancelar-operacao', catracaController.cancelarOperacaoBiometria.bind(catracaController));

router.post('/setar-primeira-mensagem', catracaController.setarPrimeiraMensagem.bind(catracaController));

router.post('/setar-segunda-mensagem', catracaController.setarSegundaMensagem.bind(catracaController));

router.post('/setar-tipo-fluxo-biometria', catracaController.setarTipoFluxoBiometria.bind(catracaController));

router.post('/setar-mensagem-bloqueio', catracaController.setarMensagemBloqueio.bind(catracaController));

router.post('/setar-sentido-horario', catracaController.setarSentidoHorario.bind(catracaController));

router.post('/setar-tipo-controle-fluxo', catracaController.setarTipoControleFluxo.bind(catracaController));

router.post('/setar-duracao-interacao', catracaController.setarDuracaoInteracao.bind(catracaController));

router.post('/liberar-saida', catracaController.liberarSaida.bind(catracaController));

router.post('/liberar-entrada', catracaController.liberarEntrada.bind(catracaController));

router.post('/liberar-entrada-saida', catracaController.liberarLivre.bind(catracaController));

router.post('/conectar', catracaController.conectar.bind(catracaController));

router.post('/desconectar', catracaController.desconectar.bind(catracaController));

router.delete('/limpar-template/:id', catracaController.limparTemplatePorId.bind(catracaController));

export const catracaRoute = router;
