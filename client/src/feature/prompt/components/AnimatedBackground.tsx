export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-primary/4 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Moving gradient shapes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-tr from-primary/8 to-primary/3 rounded-full animate-bounce delay-700"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce`}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};
