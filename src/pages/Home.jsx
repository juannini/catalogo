import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Title>Catálogo de Rick and Morty</Title>
      <Paragraph>
        Explorá los personajes de la serie con datos reales de la Rick and Morty API.
        Podés buscarlos por nombre y ver el detalle de cada uno.
      </Paragraph>
      <Button type="primary" onClick={() => navigate('/catalogo')}>Ver catálogo</Button>
    </>
  );
}
