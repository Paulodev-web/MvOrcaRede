# Exemplos Práticos de Implementação

Este documento contém exemplos de código prontos para implementar as funcionalidades do Painel Executor.

---

## 📷 1. Captura de Foto com Marca d'Água

### Serviço de Captura de Foto

```typescript
// src/services/cameraService.ts

import { MarcaDagua, EvidenciaFoto } from '../types/executor';

interface CapturaFotoOptions {
  qualidade?: number;
  larguraMaxima?: number;
  alturaMaxima?: number;
}

export class CameraService {
  /**
   * Captura uma foto usando a câmera do dispositivo
   */
  static async capturarFoto(
    options: CapturaFotoOptions = {}
  ): Promise<Blob> {
    const { qualidade = 0.85, larguraMaxima = 1920, alturaMaxima = 1080 } = options;

    try {
      // Acessa a câmera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Câmera traseira
      });

      // Cria elemento de vídeo temporário
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Aguarda o vídeo carregar
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      // Cria canvas para captura
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;

      // Calcula dimensões mantendo aspect ratio
      let width = video.videoWidth;
      let height = video.videoHeight;

      if (width > larguraMaxima) {
        height = (height * larguraMaxima) / width;
        width = larguraMaxima;
      }
      if (height > alturaMaxima) {
        width = (width * alturaMaxima) / height;
        height = alturaMaxima;
      }

      canvas.width = width;
      canvas.height = height;

      // Desenha o frame do vídeo no canvas
      context.drawImage(video, 0, 0, width, height);

      // Para o stream
      stream.getTracks().forEach(track => track.stop());

      // Converte canvas para blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Falha ao criar blob'));
          },
          'image/jpeg',
          qualidade
        );
      });
    } catch (erro) {
      console.error('Erro ao capturar foto:', erro);
      throw erro;
    }
  }

  /**
   * Adiciona marca d'água em uma foto
   */
  static async adicionarMarcaDagua(
    foto: Blob,
    marcaDagua: MarcaDagua
  ): Promise<Blob> {
    // Carrega a imagem
    const img = await this.blobToImage(foto);

    // Cria canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;

    // Desenha a imagem original
    ctx.drawImage(img, 0, 0);

    // Configurações da marca d'água
    const padding = 20;
    const lineHeight = 24;
    const fontSize = 16;

    // Fundo semi-transparente
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(
      padding,
      canvas.height - padding - (lineHeight * 4),
      canvas.width - (padding * 2),
      lineHeight * 4
    );

    // Texto da marca d'água
    ctx.fillStyle = 'white';
    ctx.font = `${fontSize}px Arial`;
    ctx.textBaseline = 'top';

    let y = canvas.height - padding - (lineHeight * 4) + 5;

    // Linha 1: Data e Hora
    const dataHora = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(marcaDagua.timestamp);
    ctx.fillText(`📅 ${dataHora}`, padding + 5, y);
    y += lineHeight;

    // Linha 2: Executor
    ctx.fillText(`👷 ${marcaDagua.executorNome}`, padding + 5, y);
    y += lineHeight;

    // Linha 3: Obra
    ctx.fillText(`🏗️ ${marcaDagua.obraNome}`, padding + 5, y);
    y += lineHeight;

    // Linha 4: GPS (se disponível)
    if (marcaDagua.localizacao) {
      const { latitude, longitude } = marcaDagua.localizacao;
      ctx.fillText(
        `📍 ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        padding + 5,
        y
      );
    }

    // Converte para blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Falha ao criar blob'));
        },
        'image/jpeg',
        0.9
      );
    });
  }

  /**
   * Converte Blob para HTMLImageElement
   */
  private static blobToImage(blob: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  /**
   * Obtém geolocalização atual
   */
  static async obterLocalizacao(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }
}
```

### Uso no Componente

```typescript
// Em PainelExecutor.tsx

import { CameraService } from '../services/cameraService';

async function handleTirarFoto() {
  try {
    // Captura foto
    const foto = await CameraService.capturarFoto({
      qualidade: 0.85,
      larguraMaxima: 1920,
      alturaMaxima: 1080
    });

    // Obtém localização
    let localizacao;
    try {
      const pos = await CameraService.obterLocalizacao();
      localizacao = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        precisao: pos.coords.accuracy
      };
    } catch {
      // Localização não disponível, continua sem
    }

    // Cria marca d'água
    const marcaDagua: MarcaDagua = {
      timestamp: new Date(),
      executorNome: 'João Silva', // Pegar do contexto
      executorId: 'executor-1',
      obraId: 'obra-123',
      obraNome: 'Obra Centro',
      tarefaId: tarefa.id,
      tarefaTitulo: tarefa.titulo,
      localizacao
    };

    // Adiciona marca d'água
    const fotoComMarca = await CameraService.adicionarMarcaDagua(
      foto,
      marcaDagua
    );

    // Salva localmente
    await salvarEvidenciaLocal(fotoComMarca, 'foto', marcaDagua);

    alert('Foto capturada e salva localmente!');
  } catch (erro) {
    console.error('Erro ao capturar foto:', erro);
    alert('Erro ao capturar foto');
  }
}
```

---

## 🎤 2. Gravação de Áudio

### Serviço de Gravação

```typescript
// src/services/audioService.ts

export class AudioService {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private startTime: number = 0;

  /**
   * Inicia gravação de áudio
   */
  async iniciarGravacao(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 64000 // 64kbps - bom para voz
      });

      this.chunks = [];
      this.startTime = Date.now();

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000); // Coleta dados a cada 1s
    } catch (erro) {
      console.error('Erro ao iniciar gravação:', erro);
      throw erro;
    }
  }

  /**
   * Para a gravação e retorna o áudio
   */
  async pararGravacao(): Promise<{
    audio: Blob;
    duracaoSegundos: number;
  }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Gravação não iniciada'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audio = new Blob(this.chunks, { type: 'audio/webm' });
        const duracao = Math.floor((Date.now() - this.startTime) / 1000);

        // Para o stream
        this.mediaRecorder?.stream.getTracks().forEach(track => track.stop());

        resolve({ audio, duracaoSegundos: duracao });
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Reproduz um áudio
   */
  async reproduzir(audio: Blob): Promise<void> {
    const audioUrl = URL.createObjectURL(audio);
    const audioElement = new Audio(audioUrl);
    
    return new Promise((resolve, reject) => {
      audioElement.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audioElement.onerror = reject;
      audioElement.play();
    });
  }

  /**
   * Obtém duração do áudio
   */
  getDuracao(): number {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  /**
   * Cancela gravação
   */
  cancelar(): void {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
    this.chunks = [];
  }
}
```

### Uso no Componente

```typescript
// Em EvidenciasMultimidia

import { AudioService } from '../services/audioService';

function EvidenciasMultimidia() {
  const [audioService] = useState(() => new AudioService());
  const [gravando, setGravando] = useState(false);
  const [duracao, setDuracao] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gravando) {
      interval = setInterval(() => {
        setDuracao(audioService.getDuracao());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gravando, audioService]);

  const handleGravarAudio = async () => {
    if (!gravando) {
      // Iniciar gravação
      try {
        await audioService.iniciarGravacao();
        setGravando(true);
        setDuracao(0);
      } catch (erro) {
        alert('Erro ao acessar microfone');
      }
    } else {
      // Parar gravação
      try {
        const { audio, duracaoSegundos } = await audioService.pararGravacao();
        setGravando(false);
        
        // Salvar localmente
        await salvarAudioLocal(audio, duracaoSegundos);
        
        alert(`Áudio gravado: ${duracaoSegundos}s`);
      } catch (erro) {
        alert('Erro ao salvar áudio');
      }
    }
  };

  return (
    <button onClick={handleGravarAudio}>
      {gravando ? (
        <>
          <Mic className="animate-pulse" />
          Gravando... {duracao}s
        </>
      ) : (
        <>
          <Mic />
          Gravar Áudio
        </>
      )}
    </button>
  );
}
```

---

## 💾 3. Armazenamento Local (IndexedDB)

### Serviço de Cache

```typescript
// src/services/cacheService.ts

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Tarefa, Quantitativo, Evidencia, OperacaoPendente } from '../types/executor';

interface ExecutorDB extends DBSchema {
  tarefas: {
    key: string;
    value: Tarefa;
    indexes: { 'by-obra': string };
  };
  quantitativos: {
    key: string;
    value: Quantitativo;
    indexes: { 'by-tarefa': string };
  };
  evidencias: {
    key: string;
    value: Evidencia;
    indexes: { 'by-tarefa': string; 'by-sincronizado': boolean };
  };
  operacoes: {
    key: string;
    value: OperacaoPendente;
    indexes: { 'by-status': string };
  };
}

export class CacheService {
  private static db: IDBPDatabase<ExecutorDB> | null = null;

  /**
   * Inicializa o banco de dados
   */
  static async init(): Promise<void> {
    if (this.db) return;

    this.db = await openDB<ExecutorDB>('executor-db', 1, {
      upgrade(db) {
        // Store de tarefas
        const tarefasStore = db.createObjectStore('tarefas', {
          keyPath: 'id'
        });
        tarefasStore.createIndex('by-obra', 'obraId');

        // Store de quantitativos
        const quantitativosStore = db.createObjectStore('quantitativos', {
          keyPath: 'id'
        });
        quantitativosStore.createIndex('by-tarefa', 'tarefaId');

        // Store de evidências
        const evidenciasStore = db.createObjectStore('evidencias', {
          keyPath: 'id'
        });
        evidenciasStore.createIndex('by-tarefa', 'tarefaId');
        evidenciasStore.createIndex('by-sincronizado', 'sincronizado');

        // Store de operações pendentes
        const operacoesStore = db.createObjectStore('operacoes', {
          keyPath: 'id'
        });
        operacoesStore.createIndex('by-status', 'status');
      }
    });
  }

  /**
   * Salva uma tarefa
   */
  static async salvarTarefa(tarefa: Tarefa): Promise<void> {
    await this.init();
    await this.db!.put('tarefas', tarefa);
  }

  /**
   * Obtém todas as tarefas de uma obra
   */
  static async obterTarefas(obraId: string): Promise<Tarefa[]> {
    await this.init();
    return this.db!.getAllFromIndex('tarefas', 'by-obra', obraId);
  }

  /**
   * Salva um quantitativo
   */
  static async salvarQuantitativo(quantitativo: Quantitativo): Promise<void> {
    await this.init();
    await this.db!.put('quantitativos', quantitativo);

    // Adiciona operação pendente
    const operacao: OperacaoPendente = {
      id: `op-${Date.now()}`,
      tipo: 'criar_quantitativo',
      dados: quantitativo,
      timestamp: new Date(),
      tentativas: 0,
      maximoTentativas: 3,
      prioridade: 0,
      status: 'pendente'
    };

    await this.db!.put('operacoes', operacao);
  }

  /**
   * Salva uma evidência
   */
  static async salvarEvidencia(evidencia: Evidencia): Promise<void> {
    await this.init();
    await this.db!.put('evidencias', evidencia);

    // Adiciona operação pendente
    const operacao: OperacaoPendente = {
      id: `op-${Date.now()}`,
      tipo: 'criar_evidencia',
      dados: evidencia,
      timestamp: new Date(),
      tentativas: 0,
      maximoTentativas: 3,
      prioridade: 1, // Menor prioridade que quantitativos
      status: 'pendente'
    };

    await this.db!.put('operacoes', operacao);
  }

  /**
   * Obtém operações pendentes
   */
  static async obterOperacoesPendentes(): Promise<OperacaoPendente[]> {
    await this.init();
    const operacoes = await this.db!.getAllFromIndex('operacoes', 'by-status', 'pendente');
    
    // Ordena por prioridade e timestamp
    return operacoes.sort((a, b) => {
      if (a.prioridade !== b.prioridade) {
        return a.prioridade - b.prioridade;
      }
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }

  /**
   * Atualiza status de operação
   */
  static async atualizarOperacao(operacao: OperacaoPendente): Promise<void> {
    await this.init();
    await this.db!.put('operacoes', operacao);
  }

  /**
   * Remove operação
   */
  static async removerOperacao(id: string): Promise<void> {
    await this.init();
    await this.db!.delete('operacoes', id);
  }

  /**
   * Obtém estatísticas do cache
   */
  static async obterEstatisticas() {
    await this.init();
    
    const tarefas = await this.db!.count('tarefas');
    const quantitativos = await this.db!.count('quantitativos');
    const evidencias = await this.db!.count('evidencias');
    const operacoes = await this.db!.count('operacoes');

    return {
      tarefas,
      quantitativos,
      evidencias,
      operacoesPendentes: operacoes
    };
  }

  /**
   * Limpa todo o cache
   */
  static async limparCache(): Promise<void> {
    await this.init();
    
    await this.db!.clear('tarefas');
    await this.db!.clear('quantitativos');
    await this.db!.clear('evidencias');
    await this.db!.clear('operacoes');
  }
}
```

### Instalação da Biblioteca IDB

```bash
npm install idb
```

---

## 🔄 4. Sincronização com Supabase

### Serviço de Sincronização

```typescript
// src/services/syncService.ts

import { CacheService } from './cacheService';
import { supabase } from '../lib/supabaseClient';
import { OperacaoPendente, ResultadoSincronizacao } from '../types/executor';

export class SyncService {
  private static sincronizando = false;

  /**
   * Sincroniza todas as operações pendentes
   */
  static async sincronizar(): Promise<ResultadoSincronizacao> {
    if (this.sincronizando) {
      throw new Error('Sincronização já em andamento');
    }

    this.sincronizando = true;
    const inicio = Date.now();

    let sucesso = 0;
    let erros = 0;
    const errosDetalhados: Array<{ operacaoId: string; erro: string }> = [];

    try {
      const operacoes = await CacheService.obterOperacoesPendentes();

      for (const operacao of operacoes) {
        try {
          await this.sincronizarOperacao(operacao);
          await CacheService.removerOperacao(operacao.id);
          sucesso++;
        } catch (erro) {
          erros++;
          errosDetalhados.push({
            operacaoId: operacao.id,
            erro: erro instanceof Error ? erro.message : 'Erro desconhecido'
          });

          // Atualiza tentativas
          operacao.tentativas++;
          operacao.ultimaTentativa = new Date();
          
          if (operacao.tentativas >= operacao.maximoTentativas) {
            operacao.status = 'erro';
          }

          await CacheService.atualizarOperacao(operacao);
        }
      }

      return {
        sucesso: erros === 0,
        operacoesSincronizadas: sucesso,
        operacoesComErro: erros,
        bytesEnviados: 0, // TODO: calcular
        duracaoMs: Date.now() - inicio,
        erros: errosDetalhados
      };
    } finally {
      this.sincronizando = false;
    }
  }

  /**
   * Sincroniza uma operação específica
   */
  private static async sincronizarOperacao(
    operacao: OperacaoPendente
  ): Promise<void> {
    switch (operacao.tipo) {
      case 'criar_quantitativo':
        await this.sincronizarQuantitativo(operacao.dados);
        break;
      
      case 'criar_evidencia':
        await this.sincronizarEvidencia(operacao.dados);
        break;
      
      default:
        throw new Error(`Tipo de operação desconhecido: ${operacao.tipo}`);
    }
  }

  /**
   * Sincroniza um quantitativo
   */
  private static async sincronizarQuantitativo(quantitativo: any): Promise<void> {
    const { error } = await supabase
      .from('obra_quantitativos')
      .insert({
        tarefa_id: quantitativo.tarefaId,
        executor_id: quantitativo.executorId,
        quantidade: quantitativo.quantidade,
        unidade: quantitativo.unidade,
        observacao: quantitativo.observacao,
        localizacao: quantitativo.localizacao,
        timestamp: quantitativo.timestamp.toISOString()
      });

    if (error) throw error;
  }

  /**
   * Sincroniza uma evidência (com upload de arquivo)
   */
  private static async sincronizarEvidencia(evidencia: any): Promise<void> {
    // 1. Upload do arquivo
    const arquivo = await fetch(evidencia.arquivoLocal).then(r => r.blob());
    const nomeArquivo = `${evidencia.id}.${evidencia.tipo === 'foto' ? 'jpg' : 'webm'}`;
    const caminho = `obras/${evidencia.tarefaId}/${nomeArquivo}`;

    const { error: uploadError } = await supabase.storage
      .from('evidencias')
      .upload(caminho, arquivo);

    if (uploadError) throw uploadError;

    // 2. Obtém URL pública
    const { data } = supabase.storage
      .from('evidencias')
      .getPublicUrl(caminho);

    // 3. Salva registro no banco
    const { error: dbError } = await supabase
      .from('obra_evidencias')
      .insert({
        tarefa_id: evidencia.tarefaId,
        executor_id: evidencia.executorId,
        tipo: evidencia.tipo,
        arquivo_url: data.publicUrl,
        metadados: evidencia.metadados,
        timestamp: evidencia.timestamp.toISOString()
      });

    if (dbError) throw dbError;
  }

  /**
   * Verifica se há conexão com internet
   */
  static async verificarConexao(): Promise<boolean> {
    if (!navigator.onLine) return false;

    try {
      const response = await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        cache: 'no-store'
      });
      return true;
    } catch {
      return false;
    }
  }
}
```

---

## 🌐 5. Hook de Status de Conexão

```typescript
// src/hooks/useOnlineStatus.ts

import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }

    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

### Uso no Componente

```typescript
// Em PainelExecutor.tsx

import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { SyncService } from '../services/syncService';

function PainelExecutor() {
  const isOnline = useOnlineStatus();

  // Sincroniza automaticamente quando ficar online
  useEffect(() => {
    if (isOnline) {
      SyncService.sincronizar()
        .then(resultado => {
          console.log('Sincronização concluída:', resultado);
        })
        .catch(erro => {
          console.error('Erro na sincronização:', erro);
        });
    }
  }, [isOnline]);

  return (
    // ... resto do componente
  );
}
```

---

## 📦 Dependências Necessárias

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.56.0",
    "idb": "^8.0.0"
  }
}
```

Instalar:
```bash
npm install idb
```

---

## ✅ Checklist de Implementação

### Fase 1: Armazenamento Local
- [ ] Instalar biblioteca `idb`
- [ ] Criar `CacheService`
- [ ] Testar salvamento de tarefas
- [ ] Testar salvamento de quantitativos
- [ ] Testar salvamento de evidências

### Fase 2: Captura de Mídia
- [ ] Criar `CameraService`
- [ ] Implementar captura de foto
- [ ] Implementar marca d'água
- [ ] Criar `AudioService`
- [ ] Implementar gravação de áudio
- [ ] Implementar captura de GPS

### Fase 3: Sincronização
- [ ] Criar `SyncService`
- [ ] Implementar sincronização de quantitativos
- [ ] Implementar upload de arquivos
- [ ] Implementar sincronização de evidências
- [ ] Implementar retry com backoff
- [ ] Criar hook `useOnlineStatus`

### Fase 4: Integração
- [ ] Integrar serviços no `PainelExecutor`
- [ ] Adicionar feedback visual
- [ ] Testar fluxo completo offline
- [ ] Testar sincronização
- [ ] Adicionar tratamento de erros

---

## 🧪 Como Testar

### Teste de Captura de Foto
1. Abra o painel no celular ou emulador mobile
2. Clique em "Tirar Foto"
3. Permita acesso à câmera
4. Tire uma foto
5. Verifique se a marca d'água foi adicionada
6. Confira se foi salva no IndexedDB

### Teste de Gravação de Áudio
1. Clique em "Gravar Áudio"
2. Permita acesso ao microfone
3. Fale algo
4. Pare a gravação
5. Confira se foi salvo no IndexedDB

### Teste de Sincronização Offline
1. Coloque o dispositivo em modo avião
2. Adicione quantitativos e evidências
3. Verifique o badge de "operações pendentes"
4. Saia do modo avião
5. Observe a sincronização automática
6. Verifique os dados no Supabase

---

Estes exemplos fornecem uma base sólida para implementar todas as funcionalidades do Painel Executor! 🚀
