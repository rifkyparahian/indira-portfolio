/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Warna yang boleh dipilih lewat CMS — disafelist agar tetap ikut ter-build
  // meskipun belum pernah dipakai di file source.
  safelist: [
    // Badge warna kartu design
    'bg-pink-100', 'bg-orange-100', 'bg-sky-100', 'bg-red-100', 'bg-yellow-100', 'bg-blue-100',
    // Background kartu design
    'bg-[#FFF8E7]', 'bg-[#FFE459]/20', 'bg-[#E0F2FE]', 'bg-[#FFE8E8]',
    // Warna judul & badge look
    'text-gray-900', 'text-emerald-600', 'text-sky-600', 'text-pink-600',
    'bg-yellow-200', 'bg-emerald-200', 'bg-pink-200', 'bg-sky-200',
    // Rotasi kartu look
    'rotate-0', 'rotate-[-1.5deg]', 'rotate-[1.5deg]', 'rotate-[-2deg]', 'rotate-[2deg]',
    'rotate-[-4deg]', 'rotate-[5deg]', 'rotate-[3deg]', 'rotate-[-5deg]',
    // Z-index compcard
    'z-10', 'z-20', 'z-30', 'z-40',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
