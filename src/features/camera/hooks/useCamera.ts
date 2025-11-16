import { useCallback, useEffect, useRef, useState } from 'react'

export type UseCameraReturn = {
  videoRef: React.RefObject<HTMLVideoElement | null>
  isCameraActive: boolean
  error: string
  toggleCamera: () => void
  hasMultipleCameras: boolean
  isTorchOn: boolean
  toggleTorch: () => void
  hasTorch: boolean
}

export const useCamera = (): UseCameraReturn => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState('')
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([])
  const [currentDeviceId, setCurrentDeviceId] = useState<string | undefined>(undefined)
  const [isTorchOn, setIsTorchOn] = useState(false)
  const [hasTorch, setHasTorch] = useState(false)

  // カメラデバイスのリストを取得
  const updateDeviceList = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setError('お使いのブラウザはカメラ機能に対応していません。')
      return
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const cameras = devices.filter((device) => device.kind === 'videoinput')
      setVideoDevices(cameras)
    } catch (err) {
      console.error('デバイスの取得に失敗しました:', err)
    }
  }, [])

  // デバイスリストを取得し、デバイス変更を監視
  useEffect(() => {
    if (!navigator.mediaDevices) {
      setError('お使いのブラウザはカメラ機能に対応していません。')
      return
    }

    updateDeviceList()

    // デバイスの接続/切断を監視
    const handleDeviceChange = () => {
      updateDeviceList()
    }

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [updateDeviceList])

  // カメラを起動する関数
  const startCamera = useCallback(async (deviceId?: string) => {
    try {
      setError('')

      // 既存のストリームを停止
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
        })
      }

      // カメラへのアクセスを要求
      const constraints: MediaStreamConstraints = {
        video: deviceId
          ? {
              deviceId: { exact: deviceId },
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            }
          : {
              facingMode: 'environment',
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      // videoエレメントにストリームを設定
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)

        // トーチ（ライト）のサポートをチェック
        const track = stream.getVideoTracks()[0]
        const capabilities = track.getCapabilities() as MediaTrackCapabilities & {
          torch?: boolean
        }
        setHasTorch(!!capabilities.torch)
        setIsTorchOn(false)
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
  }, [])

  // カメラを停止する関数
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })

      if (videoRef.current) {
        videoRef.current.srcObject = null
      }

      streamRef.current = null
      setIsCameraActive(false)
      setError('')
    }
  }, [])

  // カメラを切り替える関数
  const toggleCamera = useCallback(() => {
    if (videoDevices.length <= 1) return

    // 現在のデバイスのインデックスを取得
    const currentIndex = videoDevices.findIndex((device) => device.deviceId === currentDeviceId)
    const nextIndex = (currentIndex + 1) % videoDevices.length
    const nextDevice = videoDevices[nextIndex]

    if (nextDevice) {
      setCurrentDeviceId(nextDevice.deviceId)
      startCamera(nextDevice.deviceId)
    }
  }, [videoDevices, currentDeviceId, startCamera])

  // ライト（トーチ）を切り替える関数
  const toggleTorch = useCallback(async () => {
    if (!streamRef.current || !hasTorch) return

    try {
      const track = streamRef.current.getVideoTracks()[0]
      const constraints = {
        advanced: [{ torch: !isTorchOn } as MediaTrackConstraintSet],
      }
      await track.applyConstraints(constraints)
      setIsTorchOn(!isTorchOn)
    } catch (err) {
      console.error('ライトの切り替えに失敗しました:', err)
    }
  }, [hasTorch, isTorchOn])

  // 初回マウント時にカメラを起動
  useEffect(() => {
    if (videoDevices.length > 0 && !currentDeviceId) {
      // 初回起動時は最初のデバイスを使用
      const initialDevice = videoDevices[0]
      if (initialDevice) {
        setCurrentDeviceId(initialDevice.deviceId)
        startCamera(initialDevice.deviceId)
      }
    }
  }, [videoDevices, currentDeviceId, startCamera])

  // アンマウント時にカメラを停止
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return {
    videoRef,
    isCameraActive,
    error,
    toggleCamera,
    hasMultipleCameras: videoDevices.length > 1,
    isTorchOn,
    toggleTorch,
    hasTorch,
  }
}
