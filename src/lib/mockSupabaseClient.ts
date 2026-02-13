// Cliente Supabase Mockado - Sistema totalmente funcional sem conexão com banco de dados

interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
  email_confirmed_at?: string;
}

interface MockSession {
  user: MockUser;
  access_token: string;
  refresh_token: string;
}

class MockSupabaseClient {
  private currentSession: MockSession | null = null;
  private listeners: ((event: string, session: MockSession | null) => void)[] = [];

  // Usuário mock pré-configurado
  private mockUser: MockUser = {
    id: 'mock-user-id-123',
    email: 'usuario@exemplo.com',
    user_metadata: {
      full_name: 'Usuário Teste'
    },
    email_confirmed_at: new Date().toISOString()
  };

  constructor() {
    // Inicializa com usuário logado por padrão
    this.currentSession = {
      user: this.mockUser,
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token'
    };
  }

  // Auth API Mock
  auth = {
    // Busca sessão atual
    getSession: async () => {
      return {
        data: { session: this.currentSession },
        error: null
      };
    },

    // Busca usuário atual
    getUser: async () => {
      if (!this.currentSession) {
        return {
          data: { user: null },
          error: { message: 'Usuário não autenticado' }
        };
      }
      return {
        data: { user: this.currentSession.user },
        error: null
      };
    },

    // Login
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Validação básica mockada
      if (!email || !password) {
        return {
          data: { session: null, user: null },
          error: { message: 'Email e senha são obrigatórios' }
        };
      }

      // Simula login bem-sucedido
      this.currentSession = {
        user: { ...this.mockUser, email },
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token'
      };

      // Notifica listeners
      this.listeners.forEach(cb => cb('SIGNED_IN', this.currentSession));

      return {
        data: { session: this.currentSession, user: this.currentSession.user },
        error: null
      };
    },

    // Cadastro
    signUp: async ({ email, password, options }: any) => {
      // Validação básica mockada
      if (!email || !password) {
        return {
          data: { session: null, user: null },
          error: { message: 'Email e senha são obrigatórios' }
        };
      }

      const newUser: MockUser = {
        id: 'mock-user-' + Date.now(),
        email,
        user_metadata: options?.data || {},
        email_confirmed_at: new Date().toISOString()
      };

      this.currentSession = {
        user: newUser,
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token'
      };

      // Notifica listeners
      this.listeners.forEach(cb => cb('SIGNED_IN', this.currentSession));

      return {
        data: { session: this.currentSession, user: newUser },
        error: null
      };
    },

    // Logout
    signOut: async () => {
      const oldSession = this.currentSession;
      this.currentSession = null;

      // Notifica listeners
      this.listeners.forEach(cb => cb('SIGNED_OUT', null));

      return {
        error: null
      };
    },

    // Reset de senha
    resetPasswordForEmail: async (email: string, options?: any) => {
      console.log('Mock: Reset password email enviado para', email);
      return {
        data: {},
        error: null
      };
    },

    // Atualizar usuário
    updateUser: async (attributes: any) => {
      if (!this.currentSession) {
        return {
          data: { user: null },
          error: { message: 'Usuário não autenticado' }
        };
      }

      // Atualiza dados do usuário mockado
      this.currentSession.user = {
        ...this.currentSession.user,
        ...attributes
      };

      return {
        data: { user: this.currentSession.user },
        error: null
      };
    },

    // Reenviar email de verificação
    resend: async ({ type, email, options }: any) => {
      console.log('Mock: Email de verificação reenviado para', email);
      return {
        data: {},
        error: null
      };
    },

    // Listener de mudanças de autenticação
    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => {
      this.listeners.push(callback);

      // Chama o callback imediatamente com o estado atual
      setTimeout(() => {
        callback(this.currentSession ? 'SIGNED_IN' : 'SIGNED_OUT', this.currentSession);
      }, 0);

      return {
        subscription: {
          unsubscribe: () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
              this.listeners.splice(index, 1);
            }
          }
        },
        data: {
          subscription: {
            unsubscribe: () => {
              const index = this.listeners.indexOf(callback);
              if (index > -1) {
                this.listeners.splice(index, 1);
              }
            }
          }
        }
      };
    }
  };

  // Storage API Mock (vazio por enquanto, pode ser expandido)
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
    return new MockQueryBuilder(table, this.currentSession);
  }
}

// Mock Query Builder para simular operações de banco de dados
class MockQueryBuilder {
  private table: string;
  private session: MockSession | null;
  private filters: any[] = [];
  private selectFields: string = '*';
  private orderField?: string;
  private orderAscending: boolean = true;
  private singleResult: boolean = false;
  private limitValue?: number;

  constructor(table: string, session: MockSession | null) {
    this.table = table;
    this.session = session;
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
