type Props = {
  navigateHome: () => void
}

export const NotFoundPage = ({ navigateHome }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="relative">
          <div className="text-9xl font-bold text-gray-200 dark:text-gray-700 select-none">404</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ページが見つかりません
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={navigateHome}
            className="block w-full py-4 px-6 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:from-purple-800 active:to-pink-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 touch-manipulation"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  )
}
