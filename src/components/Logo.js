/**
 * @file Logo.js
 * Displays the logo of the application.
 * Accepts props for dynamic rendering of the title and tagline of the application.
 */
const Logo = ({ tagline }) => (
  <div className="logo">
    <h1 className="logo-text">
      <span className="logo-graphic">P</span>
      PokeQuest
    </h1>
    <p className="logo-tagline">{tagline}</p>
  </div>
)

export default Logo
