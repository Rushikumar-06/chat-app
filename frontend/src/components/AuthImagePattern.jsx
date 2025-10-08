import { MessageCircle, Users, Heart, Star, Zap, Shield } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const features = [
    { icon: MessageCircle, color: "from-blue-400 to-cyan-400" },
    { icon: Users, color: "from-purple-400 to-pink-400" },
    { icon: Heart, color: "from-red-400 to-pink-400" },
    { icon: Star, color: "from-yellow-400 to-orange-400" },
    { icon: Zap, color: "from-green-400 to-emerald-400" },
    { icon: Shield, color: "from-indigo-400 to-purple-400" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center p-12 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-lg text-center relative z-10">
        <div className="mb-12 relative">
          <div className="relative mx-auto w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center">
              <MessageCircle className="size-20 text-white animate-bounce" />
            </div>
            
            {features.map((feature, index) => {
              const angle = (index * 60) * (Math.PI / 180);
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={index}
                  className="absolute w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/30 shadow-lg animate-pulse"
                  style={{
                    left: `calc(50% + ${x}px - 32px)`,
                    top: `calc(50% + ${y}px - 32px)`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <feature.icon className={`size-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
            {title}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <span className="text-sm">Real-time messaging</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              <span className="text-sm">Secure & private</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              <span className="text-sm">Easy to use</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              <span className="text-sm">Always connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;