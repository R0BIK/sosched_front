import logo from '../../img/1024.png'
import './Header.css'

export default function Header() {
    return (
        <header>
            <img className='logo' src={ logo } alt="logo"/>
        </header>
    )
}