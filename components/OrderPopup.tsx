import React, { useState, useEffect } from 'react';
import Candle from './Candle';
import { CheckSquare, Square } from 'lucide-react';

interface OrderPopupProps {
  onClose?: () => void;
}

const OrderPopup: React.FC<OrderPopupProps> = () => {
  const [timeLeft, setTimeLeft] = useState(90); // 1:30 in seconds
  const [isLit, setIsLit] = useState(false);
  const [checks, setChecks] = useState({
    faith: false,
    secret: false,
    permanent: false
  });
  const [formData, setFormData] = useState({
    userName: '',
    targetName: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCandleClick = () => {
    setIsLit(true);
  };

  const handleSubmit = () => {
    if (!isLit) {
        alert("Por favor, enciende la vela primero.");
        return;
    }
    alert("¡Solicitud enviada!");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white font-poppins">
      
      {/* ÁREA DE CONTEÚDO - Ocupa toda a tela, sem header */}
      <div className="absolute inset-0 overflow-y-auto bg-white">
        <div className="max-w-2xl mx-auto px-6 py-8 pb-20 space-y-8">
          
          {/* Timer text above title */}
          <div className="text-center">
            <p className="text-red-600 font-bold text-xl md:text-2xl">
                EXPIRA EN: {formatTime(timeLeft)}
            </p>
          </div>

          {/* Title Section */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Acepta las condiciones de Lady Soraya</h2>
            <p className="text-gray-600">Marca todas las opciones a continuación para liberar el hechizo</p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <div 
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => toggleCheck('faith')}
            >
              <div className={`mt-1 text-pink-600 ${checks.faith ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}>
                {checks.faith ? <CheckSquare size={24} /> : <Square size={24} />}
              </div>
              <p className="text-gray-800">Entiendo que es necesaria la fe para que este hechizo funcione</p>
            </div>

            <div 
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => toggleCheck('secret')}
            >
              <div className={`mt-1 text-pink-600 ${checks.secret ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}>
                {checks.secret ? <CheckSquare size={24} /> : <Square size={24} />}
              </div>
              <p className="text-gray-800">No le contaré a nadie sobre el hechizo (esto causará la ruptura del encantamiento)</p>
            </div>

            <div 
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => toggleCheck('permanent')}
            >
              <div className={`mt-1 text-pink-600 ${checks.permanent ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`}>
                {checks.permanent ? <CheckSquare size={24} /> : <Square size={24} />}
              </div>
              <p className="text-gray-800">Entiendo que, una vez lanzado, este hechizo no puede deshacerse.</p>
            </div>
          </div>

          {/* Candle Section */}
          <div className="flex flex-col items-center space-y-4 py-4 min-h-[250px] justify-center">
            <p className="font-bold text-lg text-center text-gray-900">Haz clic en la vela para completar el hechizo</p>
            
            <Candle lit={isLit} onClick={handleCandleClick} />

            {/* Mensagem de ativação */}
            {isLit && (
                <div className="animate-in fade-in zoom-in duration-500 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-center shadow-sm w-full">
                    <p className="text-red-600 font-bold text-xl animate-pulse">
                        La energía del hechizo ha sido activada.
                    </p>
                </div>
            )}
          </div>

          {/* Form Inputs */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-bold text-gray-700">Tu nombre</label>
              <input 
                type="text" 
                placeholder="(Escribe tu nombre aquí)" 
                className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:ring-0 outline-none transition-colors"
                value={formData.userName}
                onChange={(e) => setFormData({...formData, userName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-bold text-gray-700">Nombre de la persona que deseas</label>
              <input 
                type="text" 
                placeholder="(Escribe el nombre de la persona aquí)" 
                className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-pink-500 focus:ring-0 outline-none transition-colors"
                value={formData.targetName}
                onChange={(e) => setFormData({...formData, targetName: e.target.value})}
              />
            </div>
          </div>

          {/* Final CTA */}
          <button 
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-5 px-6 rounded-xl shadow-lg transform transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            👉 QUIERO EL HECHIZO AHORA
          </button>

        </div>
      </div>
    </div>
  );
};

export default OrderPopup;