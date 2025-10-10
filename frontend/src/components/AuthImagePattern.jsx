import { MessageCircle, Users, Heart, Star, Zap, Shield } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  const features = [
    { icon: MessageCircle, color: "from-[#A9A9A9] to-[#C0C0C0]" },
    { icon: Users, color: "from-[#D3D3D3] to-[#A9A9A9]" },
    { icon: Heart, color: "from-[#C0C0C0] to-[#A9A9A9]" },
    { icon: Star, color: "from-[#A9A9A9] to-[#D3D3D3]" },
    { icon: Zap, color: "from-[#C0C0C0] to-[#A9A9A9]" },
    { icon: Shield, color: "from-[#D3D3D3] to-[#C0C0C0]" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center p-12 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-[#A9A9A9] to-[#C0C0C0] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-[#D3D3D3] to-[#A9A9A9] rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] rounded-full opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-lg text-center relative z-10">
        <div className="mb-12 relative">
          <div className="relative mx-auto w-80 h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-[#A9A9A9] via-[#C0C0C0] to-[#D3D3D3] rounded-full shadow-2xl flex items-center justify-center">
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
                  className="absolute w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-lg shadow-lg animate-pulse bg-white/80 border border-black/10 dark:bg-white/20 dark:border-white/30"
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
          <h2 className="text-4xl font-bold bg-clip-text text-transparent leading-tight bg-gradient-to-r from-[#C0C0C0] via-[#A9A9A9] to-[#D3D3D3] dark:from-white dark:via-[#9ca2ad] dark:to-white">
            {title}
          </h2>
          <p className="text-xl leading-relaxed max-w-md mx-auto text-[#A9A9A9] dark:text-[#9ca2ad]">
            {subtitle}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 text-[#A9A9A9] dark:text-[#9ca2ad]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#A9A9A9] to-[#C0C0C0] rounded-full"></div>
              <span className="text-sm">Real-time messaging</span>
            </div>
            <div className="flex items-center gap-3 text-[#A9A9A9] dark:text-[#9ca2ad]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#D3D3D3] to-[#A9A9A9] rounded-full"></div>
              <span className="text-sm">Secure & private</span>
            </div>
            <div className="flex items-center gap-3 text-[#A9A9A9] dark:text-[#9ca2ad]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] rounded-full"></div>
              <span className="text-sm">Easy to use</span>
            </div>
            <div className="flex items-center gap-3 text-[#A9A9A9] dark:text-[#9ca2ad]">
              <div className="w-2 h-2 bg-gradient-to-r from-[#A9A9A9] to-[#D3D3D3] rounded-full"></div>
              <span className="text-sm">Always connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;