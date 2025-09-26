'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateProdutoService = void 0;
const typedi_1 = require('typedi');
const _produto_service_1 = require('./@produto.service');
const BadRequestError_1 = require('../../errors/BadRequestError');
let CreateProdutoService = class CreateProdutoService {
  constructor(produtoService) {
    this.produtoService = produtoService;
  }
  execute(data) {
    return __awaiter(this, void 0, void 0, function* () {
      this._validate(data);
      return yield this.produtoService.create(data);
    });
  }
  _validate(data) {
    const required = {
      nome: 'Nome é obrigatório',
      valorVenda: 'Valor de venda é obrigatório',
      valorCusto: 'Valor de custo é obrigatório',
      estoque: 'Estoque é obrigatório',
    };
    for (const k in required) {
      const v = data[k];
      if (v === undefined || v === null) throw new BadRequestError_1.BadRequestError(required[k]);
    }
    if (typeof data.nome !== 'string') throw new BadRequestError_1.BadRequestError('Nome deve ser string');
    if (['valorVenda', 'valorCusto', 'estoque'].some((k) => typeof data[k] !== 'number')) {
      throw new BadRequestError_1.BadRequestError('Valores numéricos inválidos');
    }
    if (data.estoque < 0) throw new BadRequestError_1.BadRequestError('Estoque não pode ser negativo');
    if (data.valorVenda < 0 || data.valorCusto < 0) {
      throw new BadRequestError_1.BadRequestError('Valores não podem ser negativos');
    }
  }
};
exports.CreateProdutoService = CreateProdutoService;
exports.CreateProdutoService = CreateProdutoService = __decorate(
  [(0, typedi_1.Service)(), __metadata('design:paramtypes', [_produto_service_1.ProdutoService])],
  CreateProdutoService,
);
