import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Image as ImageIcon,
  CheckSquare,
  MessageSquare,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  ZoomIn,
  Send
} from 'lucide-react';

export function PortalClientePublico() {
  const [abaAtiva, setAbaAtiva] = useState<'geral' | 'galeria' | 'contato'>('geral');
  const [fotoSelecionada, setFotoSelecionada] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl shadow-lg">
                🏗️
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Portal do Cliente</h1>
                <p className="text-cyan-100 text-sm">Acompanhe sua obra em tempo real</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">65%</div>
              <p className="text-cyan-100 text-sm">Concluído</p>
            </div>
          </div>
        </div>
      </header>

      {/* Info da Obra */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Instalação Rede Elétrica - Bairro Centro
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4 text-cyan-600" />
              <span>Rua Principal, 1000 - Centro, São Paulo - SP</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4 text-cyan-600" />
              <span>Início: 15/01/2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-4 w-4 text-cyan-600" />
              <span>Faltam 12 dias</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex">
              <button
                onClick={() => setAbaAtiva('geral')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  abaAtiva === 'geral'
                    ? 'bg-white text-cyan-600 border-b-2 border-cyan-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-4 w-4 inline mr-2" />
                Progresso
              </button>
              <button
                onClick={() => setAbaAtiva('galeria')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  abaAtiva === 'galeria'
                    ? 'bg-white text-cyan-600 border-b-2 border-cyan-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ImageIcon className="h-4 w-4 inline mr-2" />
                Galeria (6)
              </button>
              <button
                onClick={() => setAbaAtiva('contato')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  abaAtiva === 'contato'
                    ? 'bg-white text-cyan-600 border-b-2 border-cyan-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Contato
              </button>
            </nav>
          </div>

          <div className="p-6">
            {abaAtiva === 'geral' && (
              <div className="space-y-6">
                {/* Progresso Geral */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-cyan-600" />
                    Progresso da Obra
                  </h2>

                  {/* Barra Principal */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-6 border border-cyan-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-lg font-semibold text-gray-900">Progresso Geral</span>
                      <span className="text-3xl font-bold text-cyan-600">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-6 rounded-full transition-all duration-500 shadow-lg flex items-center justify-end pr-3"
                        style={{ width: '65%' }}
                      >
                        <span className="text-white text-xs font-bold">65%</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status: <span className="font-medium text-green-600">No prazo ✅</span></span>
                      <span className="text-gray-600">Última atualização: <span className="font-medium">Hoje às 16:30</span></span>
                    </div>
                  </div>

                  {/* Cards de Detalhes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Postes */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckSquare className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Postes Instalados</h3>
                          <p className="text-2xl font-bold text-green-600">130/200</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">70 postes restantes</p>
                    </div>

                    {/* Rede */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Rede Instalada</h3>
                          <p className="text-2xl font-bold text-purple-600">3.2km/5km</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all"
                          style={{ width: '64%' }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-3">1.8km restantes</p>
                    </div>
                  </div>

                  {/* Cronograma */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-6 border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Data de Início</p>
                        <p className="text-lg font-bold text-gray-900">15/01/2026</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Dias Restantes</p>
                        <p className="text-lg font-bold text-orange-600">12 dias</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Previsão de Conclusão</p>
                        <p className="text-lg font-bold text-gray-900">25/02/2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-cyan-600" />
                    Linha do Tempo
                  </h2>

                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="space-y-4">
                      <TimelineItem titulo="Início da Obra" data="15/01/2026" concluido={true} />
                      <TimelineItem titulo="Fundações Concluídas" data="28/01/2026" concluido={true} />
                      <TimelineItem titulo="Instalação de Postes" data="Em andamento" concluido={false} emAndamento={true} />
                      <TimelineItem titulo="Instalação de Rede" data="Em andamento" concluido={false} emAndamento={true} />
                      <TimelineItem titulo="Testes e Energização" data="Previsto 20/02" concluido={false} />
                      <TimelineItem titulo="Conclusão da Obra" data="Previsto 25/02" concluido={false} ultimo={true} />
                    </div>
                  </div>
                </div>

                {/* Antes e Depois */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="h-6 w-6 text-cyan-600" />
                    Antes e Depois
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AntesDepoisCard 
                      tipo="antes"
                      titulo="ANTES"
                      descricao="Antes da Obra"
                      data="15/01/2026"
                    />
                    <AntesDepoisCard 
                      tipo="depois"
                      titulo="PROGRESSO ATUAL"
                      descricao="Progresso Atual"
                      data="13/02/2026"
                    />
                  </div>
                </div>
              </div>
            )}

            {abaAtiva === 'galeria' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Galeria de Fotos</h2>
                  <p className="text-gray-600">Acompanhe o progresso da obra através das fotos</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((id) => (
                    <FotoCard key={id} id={id} onClick={() => setFotoSelecionada(id)} />
                  ))}
                </div>

                <div className="text-center">
                  <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2 mx-auto shadow-lg">
                    <Download className="h-4 w-4" />
                    Baixar Todas as Fotos
                  </button>
                </div>

                {fotoSelecionada && (
                  <FotoModal 
                    fotoId={fotoSelecionada}
                    onClose={() => setFotoSelecionada(null)}
                  />
                )}
              </div>
            )}

            {abaAtiva === 'contato' && (
              <FormularioContato />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-600 py-6">
          <p>© 2026 Sua Empresa Ltda - Todos os direitos reservados</p>
          <p className="mt-1">Contato: (11) 99999-9999 | contato@suaempresa.com</p>
        </div>
      </div>
    </div>
  );
}

// Componente Timeline Item
function TimelineItem({ titulo, data, concluido, emAndamento, ultimo }: any) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          concluido 
            ? 'bg-green-500 text-white' 
            : emAndamento
            ? 'bg-blue-500 text-white animate-pulse'
            : 'bg-gray-300 text-gray-600'
        }`}>
          {concluido ? '✓' : emAndamento ? '⏳' : '○'}
        </div>
        {!ultimo && (
          <div className={`w-0.5 h-12 ${concluido ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        )}
      </div>
      <div className="flex-1 pb-4">
        <h3 className={`font-semibold ${concluido ? 'text-gray-900' : 'text-gray-600'}`}>
          {titulo}
        </h3>
        <p className="text-sm text-gray-600">{data}</p>
      </div>
    </div>
  );
}

// Componente Antes/Depois Card
function AntesDepoisCard({ tipo, titulo, descricao, data }: any) {
  const isDepois = tipo === 'depois';
  
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
      isDepois ? 'border-2 border-cyan-500' : 'border border-gray-200'
    }`}>
      <div className={`aspect-video flex items-center justify-center ${
        isDepois 
          ? 'bg-gradient-to-br from-cyan-200 to-blue-300' 
          : 'bg-gradient-to-br from-gray-200 to-gray-300'
      }`}>
        <div className="text-center">
          <ImageIcon className={`h-16 w-16 mx-auto mb-2 ${
            isDepois ? 'text-cyan-600' : 'text-gray-400'
          }`} />
          <p className={`text-sm ${isDepois ? 'text-cyan-700 font-medium' : 'text-gray-600'}`}>
            Foto: {descricao}
          </p>
        </div>
      </div>
      <div className={`p-4 ${isDepois ? 'bg-gradient-to-r from-cyan-50 to-blue-50' : 'bg-gray-50'}`}>
        <p className={`font-semibold ${isDepois ? 'text-cyan-700' : 'text-gray-900'}`}>{titulo}</p>
        <p className="text-sm text-gray-600">{descricao}</p>
        <p className="text-xs text-gray-500 mt-1">{data}</p>
      </div>
    </div>
  );
}

// Componente Foto Card
function FotoCard({ id, onClick }: any) {
  const fotos = [
    { id: 1, descricao: 'Início da obra', data: '15/01/2026' },
    { id: 2, descricao: 'Fundação do poste', data: '18/01/2026' },
    { id: 3, descricao: 'Postes instalados', data: '25/01/2026' },
    { id: 4, descricao: 'Instalação cabos', data: '05/02/2026' },
    { id: 5, descricao: 'Transformador', data: '10/02/2026' },
    { id: 6, descricao: 'Progresso Rua B', data: '13/02/2026' },
  ];
  
  const foto = fotos.find(f => f.id === id) || fotos[0];
  
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-105"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-xs text-gray-600 px-2 text-center">{foto.descricao}</p>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
        <p className="text-white text-xs font-medium">{foto.data}</p>
      </div>
    </button>
  );
}

// Componente Foto Modal
function FotoModal({ fotoId, onClose }: any) {
  const fotos = [
    { id: 1, descricao: 'Início da obra - área vazia', data: '15/01/2026' },
    { id: 2, descricao: 'Fundação do primeiro poste', data: '18/01/2026' },
    { id: 3, descricao: 'Postes sendo instalados', data: '25/01/2026' },
    { id: 4, descricao: 'Instalação de cabos', data: '05/02/2026' },
    { id: 5, descricao: 'Transformador instalado', data: '10/02/2026' },
    { id: 6, descricao: 'Progresso atual - Rua B', data: '13/02/2026' },
  ];
  
  const foto = fotos.find(f => f.id === fotoId) || fotos[0];
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl p-4 max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-4">
          <ImageIcon className="h-24 w-24 text-gray-400" />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-900">{foto.descricao}</p>
            <p className="text-sm text-gray-600">{foto.data}</p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente Formulário de Contato
function FormularioContato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada! Entraremos em contato em breve.');
    setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Fale Conosco</h2>
        <p className="text-gray-600">Envie suas dúvidas, sugestões ou solicite informações adicionais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
              <select
                value={formData.assunto}
                onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
              >
                <option value="">Selecione...</option>
                <option value="duvida">Dúvida sobre a obra</option>
                <option value="alteracao">Solicitação de alteração</option>
                <option value="elogio">Elogio/Feedback positivo</option>
                <option value="reclamacao">Reclamação</option>
                <option value="outro">Outro assunto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
              <textarea
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                placeholder="Digite sua mensagem..."
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg hover:from-cyan-700 hover:to-blue-800 transition-all font-medium shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Informações de Contato */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Informações de Contato</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Telefone</p>
                  <p className="text-gray-600">(11) 99999-9999</p>
                  <p className="text-gray-600">(11) 3333-3333</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contato@suaempresa.com</p>
                  <p className="text-gray-600">obras@suaempresa.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Horário de Atendimento</p>
                  <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-gray-600">Sábado: 8h às 12h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Dica</h4>
                <p className="text-sm text-gray-700">
                  Para questões urgentes, ligue diretamente. Para acompanhamento de rotina, use este formulário.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
