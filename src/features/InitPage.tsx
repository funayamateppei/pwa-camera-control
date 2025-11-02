type Props = {
  navigateCamera: () => void
}

export const InitPage = ({ navigateCamera }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:text-5xl">
            カメラ制御アプリ
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={navigateCamera}
              className="block w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-center touch-manipulation"
            >
              カメラを開く
            </button>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                アプリの機能
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  オフラインでも動作
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  モバイル最適化
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  高速・軽量
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
          Progressive Web Application
        </p>
      </div>
    </div>
  )
}
