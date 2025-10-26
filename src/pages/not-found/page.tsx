import { NotFoundPage } from '@/features'
import { useNavigate } from 'react-router-dom'

export const Page = () => {
  const navigate = useNavigate()

  return <NotFoundPage navigateHome={() => navigate('/')} />
}
