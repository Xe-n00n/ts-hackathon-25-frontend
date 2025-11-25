import Image from 'next/image';
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-screen">
      <Image src="/Main Logo.svg" alt="Hikaya Logo" width={100} height={100} className="mb-1" />
      <Image src="/App Name.svg" alt="Hikaya Title" width={100} height={100} />
    </div>
  );
}
