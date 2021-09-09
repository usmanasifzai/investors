import { Link } from 'react-router-dom';

export default function Home() {
  return(
    <div className='container text-center'>
      <h3>Welcome</h3>
      <Link to="/investors">Investors</Link>
    </div>
  )
}
