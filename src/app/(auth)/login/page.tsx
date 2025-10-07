import React from "react";

function Login() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center bg-[url('/images/home-bg.jpg')] bg-cover bg-no-repeat bg-center p-8 relative">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 text-center space-y-6 p-8 bg-white/10 backdrop-blur-sm max-w-xl mx-auto rounded-lg">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">Sign In</h1>
          <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
          <p className="text-white/80 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
