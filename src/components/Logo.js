const Logo = ({ title, tagline }) => (
  <div className="logo">
    <h1 className="logo-text">
      <span className="logo-graphic">P</span>
      {title}
    </h1>
    <p className="logo-tagline">{tagline}</p>
  </div>
)

export default Logo
