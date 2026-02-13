// Sistema de "banco de dados" mockado em memória
// Todos os dados são armazenados localmente e persistem durante a sessão

import { Material, GrupoItem, Concessionaria, Orcamento, PostType, BudgetFolder, BudgetDetails, BudgetPostDetail } from '../types';

// ==================== DADOS INICIAIS ====================

const initialMaterials: Material[] = [
  { id: '1', codigo: 'PAR-001', descricao: 'Parafuso Galvanizado 10x80mm', precoUnit: 2.50, unidade: 'UN' },
  { id: '2', codigo: 'CAB-001', descricao: 'Cabo de Alumínio 16mm²', precoUnit: 8.75, unidade: 'M' },
  { id: '3', codigo: 'POS-001', descricao: 'Poste de Concreto 9m', precoUnit: 285.00, unidade: 'UN' },
  { id: '4', codigo: 'ISO-001', descricao: 'Isolador de Porcelana 15kV', precoUnit: 12.30, unidade: 'UN' },
  { id: '5', codigo: 'CRU-001', descricao: 'Cruzeta de Concreto 2,40m', precoUnit: 95.00, unidade: 'UN' },
  { id: '6', codigo: 'FER-001', descricao: 'Ferragem para Fixação', precoUnit: 15.80, unidade: 'UN' },
  { id: '7', codigo: 'ATE-001', descricao: 'Aterramento com Haste', precoUnit: 125.00, unidade: 'UN' },
  { id: '8', codigo: 'TRA-001', descricao: 'Transformador 15kVA', precoUnit: 1250.00, unidade: 'UN' },
  { id: '9', codigo: 'CON-001', descricao: 'Conector de Alumínio', precoUnit: 5.20, unidade: 'UN' },
  { id: '10', codigo: 'LUM-001', descricao: 'Luminária LED 100W', precoUnit: 280.00, unidade: 'UN' },
];

const initialConcessionarias: Concessionaria[] = [
  { id: '1', nome: 'RGE - Rio Grande Energia', sigla: 'RGE' },
  { id: '2', nome: 'Equatorial Energia', sigla: 'Equatorial' },
  { id: '3', nome: 'CEEE - Companhia Estadual de Energia Elétrica', sigla: 'CEEE' },
  { id: '4', nome: 'CPFL - Companhia Paulista de Força e Luz', sigla: 'CPFL' },
];

const initialGruposItens: GrupoItem[] = [
  {
    id: '1',
    nome: 'Poste Simples - RGE',
    descricao: 'Conjunto básico para instalação de poste simples conforme padrão RGE',
    concessionariaId: '1',
    materiais: [
      { materialId: '3', quantidade: 1 },
      { materialId: '1', quantidade: 8 },
      { materialId: '6', quantidade: 2 },
      { materialId: '7', quantidade: 1 },
    ]
  },
  {
    id: '2',
    nome: 'Poste com Cruzeta - RGE',
    descricao: 'Poste completo com cruzeta para linha de distribuição RGE',
    concessionariaId: '1',
    materiais: [
      { materialId: '3', quantidade: 1 },
      { materialId: '5', quantidade: 1 },
      { materialId: '4', quantidade: 3 },
      { materialId: '1', quantidade: 12 },
      { materialId: '6', quantidade: 4 },
      { materialId: '7', quantidade: 1 },
    ]
  },
  {
    id: '3',
    nome: 'Poste com Transformador - RGE',
    descricao: 'Instalação completa com transformador padrão RGE',
    concessionariaId: '1',
    materiais: [
      { materialId: '3', quantidade: 1 },
      { materialId: '5', quantidade: 1 },
      { materialId: '8', quantidade: 1 },
      { materialId: '4', quantidade: 6 },
      { materialId: '1', quantidade: 16 },
      { materialId: '6', quantidade: 6 },
      { materialId: '7', quantidade: 2 },
    ]
  },
  {
    id: '4',
    nome: 'Poste Básico - Equatorial',
    descricao: 'Conjunto padrão Equatorial para poste básico',
    concessionariaId: '2',
    materiais: [
      { materialId: '3', quantidade: 1 },
      { materialId: '1', quantidade: 6 },
      { materialId: '6', quantidade: 2 },
      { materialId: '7', quantidade: 1 },
    ]
  },
  {
    id: '5',
    nome: 'Iluminação Pública - RGE',
    descricao: 'Conjunto para instalação de iluminação pública',
    concessionariaId: '1',
    materiais: [
      { materialId: '10', quantidade: 1 },
      { materialId: '1', quantidade: 4 },
      { materialId: '6', quantidade: 2 },
    ]
  },
];

const initialPostTypes: PostType[] = [
  { id: '1', name: 'Poste Concreto 9m', code: 'PC-9', description: 'Poste de concreto 9 metros', shape: 'circular', height_m: 9, price: 285.00 },
  { id: '2', name: 'Poste Concreto 11m', code: 'PC-11', description: 'Poste de concreto 11 metros', shape: 'circular', height_m: 11, price: 385.00 },
  { id: '3', name: 'Poste Concreto 12m', code: 'PC-12', description: 'Poste de concreto 12 metros', shape: 'circular', height_m: 12, price: 435.00 },
  { id: '4', name: 'Poste Metálico 10m', code: 'PM-10', description: 'Poste metálico 10 metros', shape: 'octogonal', height_m: 10, price: 520.00 },
];

const initialOrcamentos: Orcamento[] = [
  {
    id: '1',
    nome: 'Loteamento Solar da Serra',
    concessionariaId: '1',
    company_id: '1',
    dataModificacao: new Date().toISOString().split('T')[0],
    status: 'Em Andamento',
    postes: [],
    clientName: 'Construtora ABC Ltda',
    city: 'Porto Alegre',
    folderId: null,
    render_version: 2
  },
  {
    id: '2',
    nome: 'Extensão de Rede - Bairro Centro',
    concessionariaId: '2',
    company_id: '2',
    dataModificacao: new Date().toISOString().split('T')[0],
    status: 'Finalizado',
    postes: [],
    clientName: 'Prefeitura Municipal',
    city: 'Caxias do Sul',
    folderId: null,
    render_version: 2
  },
  {
    id: '3',
    nome: 'Rede Rural - Linha Nova',
    concessionariaId: '1',
    company_id: '1',
    dataModificacao: new Date().toISOString().split('T')[0],
    status: 'Em Andamento',
    postes: [],
    clientName: 'Cooperativa Agrícola',
    city: 'Pelotas',
    folderId: null,
    render_version: 2
  },
];

const initialFolders: BudgetFolder[] = [
  {
    id: '1',
    name: 'Projetos 2024',
    color: '#3b82f6',
    userId: 'mock-user-id-123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Clientes Prioritários',
    color: '#ef4444',
    userId: 'mock-user-id-123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

// ==================== ARMAZENAMENTO EM MEMÓRIA ====================

class MockDatabase {
  private materials: Material[];
  private concessionarias: Concessionaria[];
  private gruposItens: GrupoItem[];
  private postTypes: PostType[];
  private orcamentos: Orcamento[];
  private folders: BudgetFolder[];
  private budgetDetails: Map<string, BudgetDetails>;

  constructor() {
    this.materials = [...initialMaterials];
    this.concessionarias = [...initialConcessionarias];
    this.gruposItens = [...initialGruposItens];
    this.postTypes = [...initialPostTypes];
    this.orcamentos = [...initialOrcamentos];
    this.folders = [...initialFolders];
    this.budgetDetails = new Map();
  }

  // ==================== MATERIAIS ====================

  getMaterials(): Material[] {
    return [...this.materials];
  }

  getMaterialById(id: string): Material | undefined {
    return this.materials.find(m => m.id === id);
  }

  addMaterial(material: Material): Material {
    this.materials.push(material);
    return material;
  }

  updateMaterial(id: string, updates: Partial<Material>): Material | null {
    const index = this.materials.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    this.materials[index] = { ...this.materials[index], ...updates };
    return this.materials[index];
  }

  deleteMaterial(id: string): boolean {
    const index = this.materials.findIndex(m => m.id === id);
    if (index === -1) return false;
    
    this.materials.splice(index, 1);
    return true;
  }

  deleteAllMaterials(): void {
    this.materials = [];
  }

  // ==================== CONCESSIONÁRIAS ====================

  getConcessionarias(): Concessionaria[] {
    return [...this.concessionarias];
  }

  getConcessionariaById(id: string): Concessionaria | undefined {
    return this.concessionarias.find(c => c.id === id);
  }

  addConcessionaria(concessionaria: Concessionaria): Concessionaria {
    this.concessionarias.push(concessionaria);
    return concessionaria;
  }

  updateConcessionaria(id: string, updates: Partial<Concessionaria>): Concessionaria | null {
    const index = this.concessionarias.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.concessionarias[index] = { ...this.concessionarias[index], ...updates };
    return this.concessionarias[index];
  }

  deleteConcessionaria(id: string): boolean {
    const index = this.concessionarias.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.concessionarias.splice(index, 1);
    return true;
  }

  // ==================== GRUPOS DE ITENS ====================

  getGruposItens(concessionariaId?: string): GrupoItem[] {
    if (concessionariaId) {
      return this.gruposItens.filter(g => g.concessionariaId === concessionariaId);
    }
    return [...this.gruposItens];
  }

  getGrupoById(id: string): GrupoItem | undefined {
    return this.gruposItens.find(g => g.id === id);
  }

  addGrupo(grupo: GrupoItem): GrupoItem {
    this.gruposItens.push(grupo);
    return grupo;
  }

  updateGrupo(id: string, updates: Partial<GrupoItem>): GrupoItem | null {
    const index = this.gruposItens.findIndex(g => g.id === id);
    if (index === -1) return null;
    
    this.gruposItens[index] = { ...this.gruposItens[index], ...updates };
    return this.gruposItens[index];
  }

  deleteGrupo(id: string): boolean {
    const index = this.gruposItens.findIndex(g => g.id === id);
    if (index === -1) return false;
    
    this.gruposItens.splice(index, 1);
    return true;
  }

  // ==================== TIPOS DE POSTE ====================

  getPostTypes(): PostType[] {
    return [...this.postTypes];
  }

  getPostTypeById(id: string): PostType | undefined {
    return this.postTypes.find(p => p.id === id);
  }

  addPostType(postType: PostType): PostType {
    this.postTypes.push(postType);
    return postType;
  }

  updatePostType(id: string, updates: Partial<PostType>): PostType | null {
    const index = this.postTypes.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.postTypes[index] = { ...this.postTypes[index], ...updates };
    return this.postTypes[index];
  }

  deletePostType(id: string): boolean {
    const index = this.postTypes.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.postTypes.splice(index, 1);
    return true;
  }

  // ==================== ORÇAMENTOS ====================

  getOrcamentos(): Orcamento[] {
    return [...this.orcamentos];
  }

  getOrcamentoById(id: string): Orcamento | undefined {
    return this.orcamentos.find(o => o.id === id);
  }

  addOrcamento(orcamento: Orcamento): Orcamento {
    this.orcamentos.push(orcamento);
    return orcamento;
  }

  updateOrcamento(id: string, updates: Partial<Orcamento>): Orcamento | null {
    const index = this.orcamentos.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    this.orcamentos[index] = { 
      ...this.orcamentos[index], 
      ...updates,
      dataModificacao: new Date().toISOString().split('T')[0]
    };
    return this.orcamentos[index];
  }

  deleteOrcamento(id: string): boolean {
    const index = this.orcamentos.findIndex(o => o.id === id);
    if (index === -1) return false;
    
    this.orcamentos.splice(index, 1);
    this.budgetDetails.delete(id);
    return true;
  }

  // ==================== PASTAS ====================

  getFolders(): BudgetFolder[] {
    return [...this.folders];
  }

  getFolderById(id: string): BudgetFolder | undefined {
    return this.folders.find(f => f.id === id);
  }

  addFolder(folder: BudgetFolder): BudgetFolder {
    this.folders.push(folder);
    return folder;
  }

  updateFolder(id: string, updates: Partial<BudgetFolder>): BudgetFolder | null {
    const index = this.folders.findIndex(f => f.id === id);
    if (index === -1) return null;
    
    this.folders[index] = { 
      ...this.folders[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.folders[index];
  }

  deleteFolder(id: string): boolean {
    const index = this.folders.findIndex(f => f.id === id);
    if (index === -1) return false;
    
    // Remove folder reference from budgets
    this.orcamentos.forEach(o => {
      if (o.folderId === id) {
        o.folderId = null;
      }
    });
    
    this.folders.splice(index, 1);
    return true;
  }

  // ==================== DETALHES DE ORÇAMENTO ====================

  getBudgetDetails(budgetId: string): BudgetDetails | null {
    const budget = this.getOrcamentoById(budgetId);
    if (!budget) return null;

    // Se já existe em cache, retorna
    if (this.budgetDetails.has(budgetId)) {
      return this.budgetDetails.get(budgetId)!;
    }

    // Cria detalhes vazios
    const details: BudgetDetails = {
      id: budget.id,
      name: budget.nome,
      company_id: budget.company_id,
      client_name: budget.clientName,
      city: budget.city,
      status: budget.status,
      created_at: budget.dataModificacao,
      updated_at: budget.dataModificacao,
      plan_image_url: budget.imagemPlanta,
      posts: [],
      render_version: budget.render_version
    };

    this.budgetDetails.set(budgetId, details);
    return details;
  }

  updateBudgetDetails(budgetId: string, details: BudgetDetails): void {
    this.budgetDetails.set(budgetId, details);
  }

  addPostToBudget(budgetId: string, post: BudgetPostDetail): BudgetPostDetail {
    const details = this.getBudgetDetails(budgetId);
    if (details) {
      details.posts.push(post);
      this.budgetDetails.set(budgetId, details);
    }
    return post;
  }

  updatePostInBudget(budgetId: string, postId: string, updates: Partial<BudgetPostDetail>): BudgetPostDetail | null {
    const details = this.getBudgetDetails(budgetId);
    if (!details) return null;

    const postIndex = details.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return null;

    details.posts[postIndex] = { ...details.posts[postIndex], ...updates };
    this.budgetDetails.set(budgetId, details);
    return details.posts[postIndex];
  }

  deletePostFromBudget(budgetId: string, postId: string): boolean {
    const details = this.getBudgetDetails(budgetId);
    if (!details) return false;

    const postIndex = details.posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return false;

    details.posts.splice(postIndex, 1);
    this.budgetDetails.set(budgetId, details);
    return true;
  }

  // ==================== RESET ====================

  reset(): void {
    this.materials = [...initialMaterials];
    this.concessionarias = [...initialConcessionarias];
    this.gruposItens = [...initialGruposItens];
    this.postTypes = [...initialPostTypes];
    this.orcamentos = [...initialOrcamentos];
    this.folders = [...initialFolders];
    this.budgetDetails.clear();
  }
}

// Instância singleton do banco de dados mockado
export const mockDB = new MockDatabase();
