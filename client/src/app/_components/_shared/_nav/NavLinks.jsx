import Link from 'next/link';

export default function NavLinks({context, onLinkClick, navVisibility}) {

  const links = [
    { name: 'HOME', path: '/', external: false },
    { name: 'ABOUT', path: '/about', external: false },
    { name: 'RANKINGS', path: 'https://rankings.gamesetblog.com/', external: true },
  ];
  
    return (
      <div className={ context === "desktop" ? `${context}-nav-links-container` : navVisibility ? 'mobile-menu mobile-menu-visible' : 'mobile-menu mobile-menu-hidden'}>
        {links.map((link, index) => (
            link.external ? (
              <a
                key={index}
                className={`${context}-nav-link`}
                target="_blank"
                rel="noopener noreferrer"
                href={link.path}
                onClick={context === 'mobile' ? onLinkClick : null}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={index}
                className={`${context}-nav-link`}
                href={link.path}
                onClick={context === 'mobile' ? onLinkClick : null}
              >
                {link.name}
              </Link>
            )
        ))}
      </div>
    );
  };
