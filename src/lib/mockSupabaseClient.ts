// Cliente Supabase Simplificado - Sistema 100% livre sem autenticação

class MockSupabaseClient {
  // Auth API Mock - Sem autenticação real, apenas estrutura vazia
  auth = {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { session: null, user: null }, error: null }),
    signUp: async () => ({ data: { session: null, user: null }, error: null }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ data: {}, error: null }),
    updateUser: async () => ({ data: { user: null }, error: null }),
    resend: async () => ({ data: {}, error: null }),
    onAuthStateChange: () => ({
      subscription: { unsubscribe: () => {} },
      data: { subscription: { unsubscribe: () => {} } }
    })
  };

  // Storage API Mock
  storage = {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        console.log('Mock: Upload de arquivo', path);
        return {
          data: { path: `mock-storage/${path}` },
          error: null
        };
      },
      getPublicUrl: (path: string) => {
        return {
          data: { publicUrl: `https://mock-storage.com/${path}` }
        };
      },
      remove: async (paths: string[]) => {
        console.log('Mock: Remoção de arquivos', paths);
        return {
          data: {},
          error: null
        };
      }
    })
  };

  // Database API Mock
  from(table: string) {
    return new MockQueryBuilder(table);
  }
}

// Mock Query Builder para simular operações de banco de dados
class MockQueryBuilder {
  private table: string;
  private filters: any[] = [];
  private selectFields: string = '*';
  private orderField?: string;
  private orderAscending: boolean = true;
  private singleResult: boolean = false;
  private limitValue?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(fields: string = '*') {
    this.selectFields = fields;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ type: 'eq', column, value });
    return this;
  }

  neq(column: string, value: any) {
    this.filters.push({ type: 'neq', column, value });
    return this;
  }

  in(column: string, values: any[]) {
    this.filters.push({ type: 'in', column, values });
    return this;
  }

  order(column: string, { ascending = true }: { ascending?: boolean } = {}) {
    this.orderField = column;
    this.orderAscending = ascending;
    return this;
  }

  limit(count: number) {
    this.limitValue = count;
    return this;
  }

  single() {
    this.singleResult = true;
    return this;
  }

  async insert(data: any) {
    console.log(`Mock: INSERT into ${this.table}`, data);
    
    // Simula inserção bem-sucedida com ID gerado
    const insertedData = Array.isArray(data) 
      ? data.map(item => ({ ...item, id: 'mock-id-' + Date.now() + Math.random() }))
      : { ...data, id: 'mock-id-' + Date.now() };

    return {
      data: insertedData,
      error: null
    };
  }

  async update(data: any) {
    console.log(`Mock: UPDATE ${this.table}`, data, 'filters:', this.filters);
    
    return {
      data: { ...data },
      error: null
    };
  }

  async delete() {
    console.log(`Mock: DELETE from ${this.table}`, 'filters:', this.filters);
    
    return {
      data: {},
      error: null
    };
  }

  async upsert(data: any) {
    console.log(`Mock: UPSERT into ${this.table}`, data);
    
    return {
      data: Array.isArray(data) ? data : [data],
      error: null
    };
  }

  // Executa a query e retorna dados mockados
  async then(resolve: any, reject?: any) {
    try {
      const result = await this.execute();
      resolve(result);
    } catch (error) {
      if (reject) reject(error);
    }
  }

  private async execute() {
    console.log(`Mock: SELECT from ${this.table}`, 'filters:', this.filters);
    
    // Retorna dados vazios por padrão
    // Cada contexto/serviço terá sua própria lógica para popular dados
    return {
      data: this.singleResult ? null : [],
      error: null
    };
  }
}

// Exporta instância do cliente mockado
export const supabase = new MockSupabaseClient();
