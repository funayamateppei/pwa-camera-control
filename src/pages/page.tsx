import { useNavigate } from 'react-router-dom'
import { Routing } from '@/router'
import { InitPage } from '@/features'

export const Page = () => {
  const navigate = useNavigate()

  return <InitPage navigateCamera={() => navigate(Routing.Camera.path)} />
}
