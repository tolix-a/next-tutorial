/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const nextConfigFunction = async (phase) => {

  const withPWA = (await import("@ducanh2912/next-pwa")).default({
    dest: "public",
    cacheOnFrontendNav:true,
    aggressiveFrontEndNavCaching:true,
    disable:false,
    reloadOnOnline:true,

    swcMinify:true,  //이거 두개 설정해놓으면 충돌 에러 없이 잘 돈다고 함
    workboxOptions: { disableDevLogs:true }
  });

  return withPWA(nextConfig);
};

export default nextConfigFunction;
