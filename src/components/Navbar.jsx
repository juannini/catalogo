import { NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export default function Navbar() {
  const { pathname } = useLocation();
  const selected = pathname.startsWith('/catalogo') ? '/catalogo' : pathname === '/' ? '/' : '';

  const items = [
    { key: '/', label: <NavLink to="/" end>Home</NavLink> },
    { key: '/catalogo', label: <NavLink to="/catalogo">Catálogo</NavLink> },
  ];

  return (
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={selected ? [selected] : []}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}
