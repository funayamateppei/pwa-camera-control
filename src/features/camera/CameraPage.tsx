import { useCamera } from './hooks/useCamera'

type Props = {
  navigateHome: () => void
}

export const CameraPage = ({ navigateHome }: Props) => {
  const {
    videoRef,
    isCameraActive,
    error,
    toggleCamera,
    hasMultipleCameras,
    toggleTorch,
    hasTorch,
    isTorchOn,
    zoom,
    setZoom,
    hasZoom,
  } = useCamera()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-gray-800 border-b border-gray-700 safe-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={navigateHome}
            className="text-gray-400 hover:text-white transition-colors touch-manipulation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-white">カメラ</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col">
        {/* カメラビュー */}
        <div className="w-full h-full">
          <div className="relative bg-black h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
            />
            {!isCameraActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-gray-400 text-sm">カメラを起動しています</p>
                </div>
              </div>
            )}

            {/* コントロールボタン */}
            {isCameraActive && (
              <div className="absolute top-4 right-4 flex flex-row gap-3">
                {/* カメラ切り替えボタン */}
                {hasMultipleCameras && (
                  <button
                    onClick={toggleCamera}
                    className="p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-full shadow-lg transition-all duration-200 touch-manipulation"
                    aria-label="カメラを切り替え"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                )}

                {/* ライト切り替えボタン */}
                {hasTorch && (
                  <button
                    onClick={toggleTorch}
                    className={`p-3 rounded-full shadow-lg transition-all duration-200 touch-manipulation ${
                      isTorchOn
                        ? 'bg-yellow-500/90 hover:bg-yellow-600/90'
                        : 'bg-gray-800/80 hover:bg-gray-700/80'
                    }`}
                    aria-label="ライトを切り替え"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill={isTorchOn ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* ズームスライダー */}
            {hasZoom && isCameraActive && (
              <div className="absolute bottom-4 left-4 right-4 px-2">
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    aria-label="ズーム"
                  />
                </div>
              </div>
            )}
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-xl">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
