// components/MainPage.tsx
'use client'
import { useAuthStore } from "./store";
import { useRouter } from "next/navigation";

const features = [
  { title: '빠른 상담', description: '즉각적인 답변과 신속한 상담을 제공합니다.' },
  { title: '정확한 정보', description: '최신 법률과 규정에 따른 정확한 정보를 제공합니다.' },
  { title: '24/7 지원', description: '언제든지 도움이 필요할 때 24시간 지원합니다.' },
];

export default function Home() {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  const handleButtonClick = () => {
    if (accessToken) {
      router.push('/Chat');
    } else {
      router.push('/login');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black">
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          산재처리, 이제 쉽고 빠르게
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          AI 챗봇으로 산재처리 과정을 간편하게 안내해 드립니다.
        </p>
        <button
          className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300"
          onClick={handleButtonClick}>
          챗봇 시작하기
        </button>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">추후 확장 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">전문가 연결</h3>
            <p className="text-gray-600 dark:text-gray-400">
              빠른 상담 내용을 토대로 전문가와 연결해 드립니다. 전문적인 조언과 도움을 받을 수 있습니다.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">커뮤니티</h3>
            <p className="text-gray-600 dark:text-gray-400">
              주변 사례를 알아보기 위한 커뮤니티를 제공합니다. 유사한 경험을 공유하고 도움을 받을 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
