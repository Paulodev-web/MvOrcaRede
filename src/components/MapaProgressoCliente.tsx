import React, { useState, useRef, useEffect } from 'react';
import { Loader2, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Map as MapIcon } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configuração do worker do PDF
pdfjs.GlobalWorkerOptions.workerSrc = 
  import.meta.env.PROD 
    ? `https://unpkg.com/pdfjs-dist@5.3.93/build/pdf.worker.min.mjs`
    : `/pdf.worker.min.mjs`;

interface PosteMapa {
  id: string;
  name: string;
  x_coord: number;
  y_coord: number;
  status: 'concluido' | 'em_progresso' | 'pendente';
  tipoPoste?: string;
}

interface MapaProgressoClienteProps {
  imagemPlanta?: string | null;
  postes: PosteMapa[];
  renderVersion?: number; // 1 ou 2 (para compatibilidade com CanvasVisual)
}

export function MapaProgressoCliente({ 
  imagemPlanta, 
  postes = [],
  renderVersion = 1 
}: MapaProgressoClienteProps) {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
    naturalWidth: number;
    naturalHeight: number;
  } | null>(null);
  
  // Estados para PDF
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [posteHover, setPosteHover] = useState<string | null>(null);

  const hasImage = imagemPlanta && imagemPlanta.trim() !== '';
  
  const defaultCanvasDimensions = {
    width: 6000,
    height: 6000,
    naturalWidth: 6000,
    naturalHeight: 6000
  };

  const isPDF = hasImage && (
    imagemPlanta?.toLowerCase().includes('.pdf') || 
    imagemPlanta?.toLowerCase().includes('application/pdf') ||
    imagemPlanta?.startsWith('data:application/pdf')
  );
  
  // Carregar dimensões da imagem
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (!hasImage) {
      setImageDimensions(defaultCanvasDimensions);
    } else if (isPDF) {
      setPdfLoading(true);
      setNumPages(null);
      setPageNumber(1);
      setImageDimensions({
        width: 800,
        height: 600,
        naturalWidth: 800,
        naturalHeight: 600
      });

      timeoutId = setTimeout(() => {
        setPdfLoading(false);
      }, 10000);
    } else if (imagemPlanta && !isPDF) {
      setImageLoading(true);
      
      const loadImage = () => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imagemPlanta!;
        
        img.onload = () => {
          const maxWidth = 1200;
          const maxHeight = 800;
          
          const imageAspectRatio = img.width / img.height;

          let width: number;
          let height: number;

          if (imageAspectRatio > maxWidth / maxHeight) {
            width = maxWidth;
            height = maxWidth / imageAspectRatio;
          } else {
            height = maxHeight;
            width = maxHeight * imageAspectRatio;
          }

          setImageDimensions({
            width,
            height,
            naturalWidth: img.width,
            naturalHeight: img.height
          });
          
          setImageLoading(false);
        };
        
        img.onerror = () => {
          setImageDimensions(null);
          setImageLoading(false);
        };
      };
      
      setTimeout(loadImage, 100);
    } else {
      setImageDimensions(null);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [imagemPlanta, isPDF, hasImage]);

  // Centralizar imagens normais após carregamento
  useEffect(() => {
    if (hasImage && !isPDF && imageDimensions && transformRef.current) {
      const timer = setTimeout(() => {
        if (transformRef.current) {
          transformRef.current.centerView(0.8, 200);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [hasImage, isPDF, imageDimensions?.width, imageDimensions?.height]);

  // Funções para PDF
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPdfLoading(false);
  };

  const onDocumentLoadError = () => {
    setPdfLoading(false);
    setNumPages(null);
    setImageDimensions({
      width: 800,
      height: 600,
      naturalWidth: 800,
      naturalHeight: 600
    });
  };

  const onPageLoadSuccess = (page: any) => {
    const viewport = page.getViewport({ scale: 1 });
    
    let finalWidth: number;
    let finalHeight: number;
    let scale: number;
    
    if (renderVersion === 2) {
      const targetWidth = 6000;
      scale = targetWidth / viewport.width;
      
      finalWidth = targetWidth;
      finalHeight = viewport.height * scale;
    } else {
      const minScale = 2;
      const maxScale = 4;
      scale = Math.max(minScale, Math.min(maxScale, 1200 / Math.max(viewport.width, viewport.height)));
      
      finalWidth = viewport.width * scale;
      finalHeight = viewport.height * scale;
    }

    setImageDimensions({
      width: finalWidth,
      height: finalHeight,
      naturalWidth: viewport.width,
      naturalHeight: viewport.height
    });
    
    setPdfLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset;
      if (newPageNumber >= 1 && numPages && newPageNumber <= numPages) {
        return newPageNumber;
      }
      return prevPageNumber;
    });
  };

  const centerOnPDF = () => {
    if (transformRef.current) {
      if (!hasImage || isPDF) {
        transformRef.current.setTransform(-1000, -1200, 0.5, 300, 'easeOutQuad');
      } else {
        transformRef.current.resetTransform();
      }
    }
  };

  // Renderizar ícone de poste com cor baseada no status
  const renderPoste = (poste: PosteMapa) => {
    const statusColors = {
      concluido: {
        bg: 'bg-green-500',
        border: 'border-green-700',
        text: 'text-white',
        shadow: 'shadow-green-600/50',
        label: '✓'
      },
      em_progresso: {
        bg: 'bg-yellow-500',
        border: 'border-yellow-700',
        text: 'text-gray-900',
        shadow: 'shadow-yellow-600/50',
        label: '⏳'
      },
      pendente: {
        bg: 'bg-gray-400',
        border: 'border-gray-600',
        text: 'text-white',
        shadow: 'shadow-gray-600/50',
        label: '○'
      }
    };

    const colors = statusColors[poste.status];
    const isHovered = posteHover === poste.id;

    return (
      <div
        key={poste.id}
        className={`absolute cursor-help transition-all duration-200 ${
          isHovered ? 'scale-125 z-50' : 'z-10'
        }`}
        style={{
          left: `${poste.x_coord}px`,
          top: `${poste.y_coord}px`,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseEnter={() => setPosteHover(poste.id)}
        onMouseLeave={() => setPosteHover(null)}
      >
        {/* Ícone do Poste */}
        <div
          className={`
            w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm
            ${colors.bg} ${colors.border} ${colors.text} ${colors.shadow} shadow-lg
            ${isHovered ? 'ring-4 ring-white' : ''}
          `}
        >
          {colors.label}
        </div>

        {/* Tooltip com informações */}
        {isHovered && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl whitespace-nowrap z-[100]">
            <div className="font-semibold">{poste.name}</div>
            {poste.tipoPoste && (
              <div className="text-gray-300 text-[10px]">{poste.tipoPoste}</div>
            )}
            <div className={`text-[10px] font-medium mt-1 ${
              poste.status === 'concluido' ? 'text-green-400' :
              poste.status === 'em_progresso' ? 'text-yellow-400' :
              'text-gray-400'
            }`}>
              {poste.status === 'concluido' ? 'Concluído' :
               poste.status === 'em_progresso' ? 'Em Progresso' :
               'Pendente'}
            </div>
            {/* Seta do tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
          </div>
        )}
      </div>
    );
  };

  // Calcular estatísticas
  const stats = {
    total: postes.length,
    concluidos: postes.filter(p => p.status === 'concluido').length,
    emProgresso: postes.filter(p => p.status === 'em_progresso').length,
    pendentes: postes.filter(p => p.status === 'pendente').length
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <MapIcon className="h-5 w-5 text-cyan-600" />
            <h3 className="text-lg font-semibold text-gray-900">Mapa de Progresso da Obra</h3>
          </div>
        </div>

        {/* Estatísticas em linha */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
            <span className="text-gray-700">
              <span className="font-semibold text-green-700">{stats.concluidos}</span> Concluídos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
            <span className="text-gray-700">
              <span className="font-semibold text-yellow-700">{stats.emProgresso}</span> Em Progresso
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400 border border-gray-600"></div>
            <span className="text-gray-700">
              <span className="font-semibold text-gray-600">{stats.pendentes}</span> Pendentes
            </span>
          </div>
          <div className="ml-auto text-gray-600">
            Total: <span className="font-semibold text-gray-900">{stats.total}</span> postes
          </div>
        </div>
      </div>
      
      {/* Controles */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Controles de Zoom */}
            <div className="flex items-center space-x-0.5 bg-white border border-gray-300 rounded-md">
              <button
                onClick={() => transformRef.current?.zoomOut()}
                disabled={imageLoading || pdfLoading}
                className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                title="Diminuir zoom"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={centerOnPDF}
                disabled={imageLoading || pdfLoading}
                className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                title="Centralizar"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => transformRef.current?.zoomIn()}
                disabled={imageLoading || pdfLoading}
                className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Aumentar zoom"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
            
            {/* Controles de PDF */}
            {isPDF && numPages && numPages > 1 && (
              <div className="flex items-center space-x-0.5 bg-white border border-gray-300 rounded-md">
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNumber <= 1}
                  className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                  title="Página anterior"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <span className="text-xs text-gray-600 px-2 min-w-[60px] text-center">
                  {pageNumber}/{numPages}
                </span>
                <button
                  onClick={() => changePage(1)}
                  disabled={pageNumber >= numPages}
                  className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border-l border-gray-300"
                  title="Próxima página"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
          
          <div className="text-xs text-gray-500 italic">
            {pdfLoading ? 'Carregando PDF...' :
             imageLoading ? 'Carregando...' :
             'Passe o mouse sobre os postes para ver detalhes'}
          </div>
        </div>
      </div>

      {/* Container do mapa */}
      <div className="flex-1 relative bg-gray-50 overflow-hidden">
        <TransformWrapper
          key={`transform-${hasImage}-${isPDF}`}
          ref={transformRef}
          minScale={0.1}
          maxScale={5}
          initialScale={hasImage && !isPDF ? 0.8 : 0.5}
          initialPositionX={hasImage && !isPDF ? 0 : -1000}
          initialPositionY={hasImage && !isPDF ? 0 : -1200}
          wheel={{ step: 0.1 }}
          panning={{ disabled: false }}
          doubleClick={{ disabled: false }}
          centerOnInit={false}
          limitToBounds={false}
        >
          <TransformComponent
            wrapperClass="w-full h-full"
            contentClass={hasImage && !isPDF ? "w-full h-full flex items-center justify-center" : "w-full h-full"}
          >
            {!hasImage ? (
              // CASO 1: Quadro branco
              <div 
                className="relative"
                style={{
                  width: '6000px',
                  height: '6000px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb'
                }}
              >
                {!imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <MapIcon className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Planta da obra não disponível</p>
                    </div>
                  </div>
                )}
                
                {/* Postes no quadro branco */}
                {postes.map(renderPoste)}
              </div>
            ) : isPDF ? (
              // CASO 2: PDF
              <div 
                className="relative"
                style={{
                  width: '6000px',
                  height: '6000px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb'
                }}
              >
                {pdfLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
                      <span className="text-sm text-gray-600">Carregando PDF...</span>
                    </div>
                  </div>
                )}
                
                {/* PDF renderizado no centro */}
                <div
                  style={{
                    position: 'absolute',
                    top: '3000px',
                    left: '3000px',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                    pointerEvents: 'none'
                  }}
                >
                  <div 
                    style={{
                      backgroundColor: renderVersion === 2 ? 'transparent' : '#f8f9fa',
                      padding: renderVersion === 2 ? '0' : '20px',
                      borderRadius: renderVersion === 2 ? '0' : '8px',
                      border: renderVersion === 2 ? 'none' : '2px solid #dee2e6',
                      pointerEvents: 'none'
                    }}
                  >
                    <Document
                      file={imagemPlanta}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={onDocumentLoadError}
                      loading={
                        <div className="flex items-center justify-center p-8 text-cyan-600 bg-white rounded">
                          <Loader2 className="h-8 w-8 animate-spin mr-3" />
                          <span className="text-lg">Carregando PDF...</span>
                        </div>
                      }
                      error={
                        <div className="text-center text-red-600 p-8 bg-red-50 rounded border-2 border-red-200">
                          <p className="font-medium text-lg">Erro ao carregar PDF</p>
                          <p className="text-sm mt-2">Verifique se o arquivo é válido</p>
                        </div>
                      }
                    >
                      {numPages && (
                        <div className="bg-white" style={{ pointerEvents: 'none' }}>
                          <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            onLoadSuccess={onPageLoadSuccess}
                            onLoadError={() => setPdfLoading(false)}
                            width={imageDimensions?.width || 1200}
                            renderMode="canvas"
                            className={renderVersion === 2 ? "" : "shadow-xl border-2 border-gray-300"}
                          />
                        </div>
                      )}
                    </Document>
                  </div>
                </div>
                
                {/* Camada transparente para postes */}
                <div 
                  className="absolute top-0 left-0"
                  style={{
                    width: '6000px',
                    height: '6000px',
                    backgroundColor: 'transparent',
                    zIndex: 100
                  }}
                >
                  {postes.map(renderPoste)}
                </div>
              </div>
            ) : (
              // CASO 3: Imagem normal
              <div 
                className="relative flex items-center justify-center"
                style={{
                  width: '100%',
                  height: '100%',
                  minWidth: imageDimensions?.width ?? 'auto',
                  minHeight: imageDimensions?.height ?? 'auto'
                }}
              >
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
                      <span className="text-sm text-gray-600">Carregando imagem...</span>
                    </div>
                  </div>
                )}
                
                {/* Imagem */}
                {imageDimensions && !imageLoading && (
                  <div
                    style={{
                      width: imageDimensions.width,
                      height: imageDimensions.height,
                      backgroundImage: `url(${imagemPlanta})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      border: '2px solid #ccc',
                      borderRadius: '8px'
                    }}
                  />
                )}
                
                {/* Postes na imagem */}
                {postes.map(renderPoste)}
              </div>
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}

export default MapaProgressoCliente;
