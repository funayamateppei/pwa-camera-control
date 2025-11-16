import { useEffect, useRef, useState } from 'react'

export type UseCameraOptions = {
  facingMode?: 'user' | 'environment'
}

export type UseCameraReturn = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  isCameraActive: boolean
  error: string
}

export const useCamera = (options: UseCameraOptions = {}): UseCameraReturn => {
  const { facingMode = 'environment' } = options
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState('')

  // マウント時にカメラを起動し、アンマウント時に停止
  useEffect(() => {
    const startCamera = async () => {
      try {
        setError('')

        // カメラへのアクセスを要求
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        })

        // videoエレメントにストリームを設定
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setIsCameraActive(true)
        }
      } catch (err) {
        console.error('カメラの起動に失敗しました:', err)

        if (err instanceof Error) {
          if (err.name === 'NotAllowedError') {
            setError('カメラへのアクセスが拒否されました。ブラウザの設定を確認してください。')
          } else if (err.name === 'NotFoundError') {
            setError('カメラが見つかりませんでした。')
          } else if (err.name === 'NotReadableError') {
            setError('カメラは既に使用中です。')
          } else {
            setError('カメラの起動に失敗しました。')
          }
        } else {
          setError('カメラの起動に失敗しました。')
        }

        setIsCameraActive(false)
      }
    }

    const stopCamera = () => {
      if (streamRef.current) {
        // すべてのトラックを停止
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
        })

        // videoエレメントのストリームをクリア
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }

        streamRef.current = null
        setIsCameraActive(false)
        setError('')
      }
    }

    startCamera()

    return () => {
      stopCamera()
    }
  }, [facingMode])

  return {
    videoRef,
    isCameraActive,
    error,
  }
}
