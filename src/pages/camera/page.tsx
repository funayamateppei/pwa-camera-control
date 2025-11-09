import { useNavigate } from 'react-router-dom'
import { CameraPage } from '@/features'

export const Page = () => {
  const navigate = useNavigate()

  return <CameraPage navigateHome={() => navigate('/')} />
}
