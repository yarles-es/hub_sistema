"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.CatracaController = void 0;
const typedi_1 = require("typedi");
const entrada_saida_catraca_service_1 = require("../services/catraca/entrada-saida-catraca.service");
const busca_id_disponivel_registro_service_1 = require("../services/catraca/busca-id-disponivel-registro.service");
const etapas_cadastro_biometria_service_1 = require("../services/catraca/etapas-cadastro-biometria.service");
const iniciar_cadastro_biometria_service_1 = require("../services/catraca/iniciar-cadastro-biometria.service");
const cancelar_operacao_biometria_service_1 = require("../services/catraca/cancelar-operacao-biometria.service");
const get_first_cadastro_biometria_service_1 = require("../services/catraca/get-first-cadastro-biometria.service");
const limpar_template_por_id_service_1 = require("../services/catraca/limpar-template-por-id.service");
const busca_mensagens_catraca_service_1 = require("../services/catraca/busca-mensagens-catraca.service");
const busca_duracao_interacao_catraca_service_1 = require("../services/catraca/busca-duracao-interacao-catraca.service");
const liberar_entrada_catraca_service_1 = require("../services/catraca/liberar-entrada-catraca.service");
const conectar_catraca_service_1 = require("../services/catraca/conectar-catraca.service");
const desconectar_catraca_service_1 = require("../services/catraca/desconectar-catraca.service");
const setar_duracao_interacao_catraca_service_1 = require("../services/catraca/setar-duracao-interacao-catraca.service");
const setar_primeira_mensagem_catraca_service_1 = require("../services/catraca/setar-primeira-mensagem-catraca.service");
const setar_segunda_mensagem_catraca_service_1 = require("../services/catraca/setar-segunda-mensagem-catraca.service");
const setar_mensagem_bloqueio_catraca_service_1 = require("../services/catraca/setar-mensagem-bloqueio-catraca.service");
const setar_sentido_horario_catraca_service_1 = require("../services/catraca/setar-sentido-horario-catraca.service");
const setar_tipo_controle_fluxo_catraca_service_1 = require("../services/catraca/setar-tipo-controle-fluxo-catraca.service");
const setar_tipo_fluxo_biometria_catraca_service_1 = require("../services/catraca/setar-tipo-fluxo-biometria-catraca.service");
const entrada_nao_identificada_service_1 = require("../services/catraca/entrada-nao-identificada.service");
const create_log_service_1 = require("../services/log-sistema/create-log.service");
const liberar_livre_catraca_service_1 = require("../services/catraca/liberar-livre-catraca.service");
const liberar_saida_catraca_service_1 = require("../services/catraca/liberar-saida-catraca.service");
const reiniciar_catraca_service_1 = require("../services/catraca/reiniciar-catraca.service");
let CatracaController = class CatracaController {
    constructor(entradasaidaCatracaService, buscaIdDisponivelRegistroService, etapasCadastroBiometriaService, iniciarCadastroBiometriaService, cancelarOperacaoBiometriaService, getFirstCadastroBiometriaService, limparTemplatePorIdService, buscaMensagensCatracaService, buscaDuracaoInteracaoCatracaService, liberarSaidaCatracaService, liberarEntradaCatracaService, desconectarCatracaService, conectarCatracaService, liberarLivreCatracaService, setarDuracaoInteracaoCatracaService, setarPrimeiraMensagemCatracaService, setarSegundaMensagemCatracaService, setarMensagemBloqueioCatracaService, setarSentidoHorarioCatracaService, setarTipoControleFluxoCatracaService, setarTipoFluxoBiometriaCatracaService, entradaNaoIdentificadaService, reiniciarCatracaService, log) {
        this.entradasaidaCatracaService = entradasaidaCatracaService;
        this.buscaIdDisponivelRegistroService = buscaIdDisponivelRegistroService;
        this.etapasCadastroBiometriaService = etapasCadastroBiometriaService;
        this.iniciarCadastroBiometriaService = iniciarCadastroBiometriaService;
        this.cancelarOperacaoBiometriaService = cancelarOperacaoBiometriaService;
        this.getFirstCadastroBiometriaService = getFirstCadastroBiometriaService;
        this.limparTemplatePorIdService = limparTemplatePorIdService;
        this.buscaMensagensCatracaService = buscaMensagensCatracaService;
        this.buscaDuracaoInteracaoCatracaService = buscaDuracaoInteracaoCatracaService;
        this.liberarSaidaCatracaService = liberarSaidaCatracaService;
        this.liberarEntradaCatracaService = liberarEntradaCatracaService;
        this.desconectarCatracaService = desconectarCatracaService;
        this.conectarCatracaService = conectarCatracaService;
        this.liberarLivreCatracaService = liberarLivreCatracaService;
        this.setarDuracaoInteracaoCatracaService = setarDuracaoInteracaoCatracaService;
        this.setarPrimeiraMensagemCatracaService = setarPrimeiraMensagemCatracaService;
        this.setarSegundaMensagemCatracaService = setarSegundaMensagemCatracaService;
        this.setarMensagemBloqueioCatracaService = setarMensagemBloqueioCatracaService;
        this.setarSentidoHorarioCatracaService = setarSentidoHorarioCatracaService;
        this.setarTipoControleFluxoCatracaService = setarTipoControleFluxoCatracaService;
        this.setarTipoFluxoBiometriaCatracaService = setarTipoFluxoBiometriaCatracaService;
        this.entradaNaoIdentificadaService = entradaNaoIdentificadaService;
        this.reiniciarCatracaService = reiniciarCatracaService;
        this.log = log;
    }
    webhook(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { command } = body;
                if (command === 774 || command === 771) {
                    // comando manda para o controle de entrada e saida do usuario
                    yield this.entradasaidaCatracaService.execute(req.body);
                    res.status(200).send();
                }
                else if (command === 775) {
                    // comando quando n identifica alguem na catraca
                    yield this.entradaNaoIdentificadaService.execute();
                    res.status(200).send();
                }
                else if (command === 259) {
                    // comando que controla as etapas do cadastro da biometria
                    yield this.etapasCadastroBiometriaService.execute(req.body);
                    res.status(200).send();
                }
                else if (command === 23205) {
                    // comando que recebe quando acontece erro no registro de biometria
                    yield this.etapasCadastroBiometriaService.executeError(req.body);
                    res.status(200).send();
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    iniciarCadastroBiometria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { clienteId, catracaId } = req.body;
                const result = yield this.iniciarCadastroBiometriaService.execute(clienteId, catracaId);
                yield this.log.execute(user.id, 'Iniciou cadastro de biometria', clienteId);
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    buscarIdDisponivel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const id = yield this.buscaIdDisponivelRegistroService.execute();
                yield this.log.execute(user.id, 'Buscou ID disponível da Catraca');
                res.status(200).json({ id });
            }
            catch (error) {
                next(error);
            }
        });
    }
    cancelarOperacaoBiometria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield this.cancelarOperacaoBiometriaService.execute();
                yield this.log.execute(user.id, 'Cancelou operação de biometria');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCadastroBiometria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const result = yield this.getFirstCadastroBiometriaService.execute();
                yield this.log.execute(user.id, 'Buscou primeiro cadastro de biometria');
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    limparTemplatePorId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const result = yield this.limparTemplatePorIdService.execute(Number(id));
                yield this.log.execute(user.id, 'Limpou template por ID', Number(id));
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    buscarMensagens(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.buscaMensagensCatracaService.execute();
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    buscarDuracaoInteracao(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.buscaDuracaoInteracaoCatracaService.execute();
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    liberarSaida(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield this.liberarSaidaCatracaService.execute();
                yield this.log.execute(user.id, 'Liberou saída da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    liberarEntrada(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield this.liberarEntradaCatracaService.execute();
                yield this.log.execute(user.id, 'Liberou entrada da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    conectar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.conectarCatracaService.execute();
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    desconectar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.desconectarCatracaService.execute();
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    liberarLivre(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield this.liberarLivreCatracaService.execute();
                yield this.log.execute(user.id, 'Liberou livre da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarDuracaoInteracao(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { duracao } = req.body;
                yield this.setarDuracaoInteracaoCatracaService.execute(duracao);
                yield this.log.execute(user.id, 'Setou duração de interação da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarPrimeiraMensagem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { mensagem } = req.body;
                yield this.setarPrimeiraMensagemCatracaService.execute(mensagem);
                yield this.log.execute(user.id, 'Setou primeira mensagem da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarSegundaMensagem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { mensagem } = req.body;
                yield this.setarSegundaMensagemCatracaService.execute(mensagem);
                yield this.log.execute(user.id, 'Setou segunda mensagem da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarMensagemBloqueio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { mensagem } = req.body;
                yield this.setarMensagemBloqueioCatracaService.execute(mensagem);
                yield this.log.execute(user.id, 'Setou mensagem de bloqueio da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarSentidoHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { sentidoHorario } = req.body;
                yield this.setarSentidoHorarioCatracaService.execute(sentidoHorario);
                yield this.log.execute(user.id, 'Setou sentido horário da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarTipoControleFluxo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { tipo } = req.body;
                yield this.setarTipoControleFluxoCatracaService.execute(tipo);
                yield this.log.execute(user.id, 'Setou tipo de controle de fluxo da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    reiniciarCatraca(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield this.reiniciarCatracaService.execute();
                yield this.log.execute(user.id, 'Reiniciou a Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    setarTipoFluxoBiometria(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { tipo } = req.body;
                yield this.setarTipoFluxoBiometriaCatracaService.execute(Number(tipo));
                yield this.log.execute(user.id, 'Setou tipo de fluxo de biometria da Catraca');
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.CatracaController = CatracaController;
exports.CatracaController = CatracaController = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [entrada_saida_catraca_service_1.EntradasaidaCatracaService,
        busca_id_disponivel_registro_service_1.BuscaIdDisponivelRegistroService,
        etapas_cadastro_biometria_service_1.EtapasCadastroBiometriaService,
        iniciar_cadastro_biometria_service_1.IniciarCadastroBiometriaService,
        cancelar_operacao_biometria_service_1.CancelarOperacaoBiometriaService,
        get_first_cadastro_biometria_service_1.GetFirstCadastroBiometriaService,
        limpar_template_por_id_service_1.LimparTemplatePorIdService,
        busca_mensagens_catraca_service_1.BuscaMensagensCatracaService,
        busca_duracao_interacao_catraca_service_1.BuscaDuracaoInteracaoCatracaService,
        liberar_saida_catraca_service_1.LiberarSaidaCatracaService,
        liberar_entrada_catraca_service_1.LiberarEntradaCatracaService,
        desconectar_catraca_service_1.DesconectarCatracaService,
        conectar_catraca_service_1.ConectarCatracaService,
        liberar_livre_catraca_service_1.LiberarLivreCatracaService,
        setar_duracao_interacao_catraca_service_1.SetarDuracaoInteracaoCatracaService,
        setar_primeira_mensagem_catraca_service_1.SetarPrimeiraMensagemCatracaService,
        setar_segunda_mensagem_catraca_service_1.SetarSegundaMensagemCatracaService,
        setar_mensagem_bloqueio_catraca_service_1.SetarMensagemBloqueioCatracaService,
        setar_sentido_horario_catraca_service_1.SetarSentidoHorarioCatracaService,
        setar_tipo_controle_fluxo_catraca_service_1.SetarTipoControleFluxoCatracaService,
        setar_tipo_fluxo_biometria_catraca_service_1.SetarTipoFluxoBiometriaCatracaService,
        entrada_nao_identificada_service_1.EntradaNaoIdentificadaService,
        reiniciar_catraca_service_1.ReiniciarCatracaService,
        create_log_service_1.CreateLogService])
], CatracaController);
