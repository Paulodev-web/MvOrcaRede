// DADOS MOCKADOS - Importados do banco de dados simulado
// Este arquivo agora serve apenas como ponte para o mockDatabase

import { mockDB } from './mockDatabase';

// Exporta funções que retornam dados do banco mockado
export const concessionarias = mockDB.getConcessionarias();
export const materiais = mockDB.getMaterials();
export const gruposItens = mockDB.getGruposItens();
export const orcamentos = mockDB.getOrcamentos();

// Re-exporta o banco de dados mockado para uso direto
export { mockDB };