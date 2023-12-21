import Wrapper from './Wrapper'
import Logo from './Logo'

const Header = ({ tagline }) => {
  return (
    <header className="header">
      <Wrapper>
        {/* Logo component with title and tagline. */}
        <Logo tagline={tagline} />
      </Wrapper>
    </header>
  )
}

export default Header
