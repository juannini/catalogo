import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Descriptions, Image, Result, Skeleton, Space, Typography } from 'antd';
import { getItemById } from '../services/api.js';
import EstadoError from '../components/EstadoError.jsx';

const { Title } = Typography;

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setError(false);
    setItem(null);

    (async () => {
      try {
        const data = await getItemById(id);
        if (!cancelado) setItem(data);
      } catch {
        if (!cancelado) setError(true);
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [id, intento]);

  if (loading) return <Skeleton active avatar paragraph={{ rows: 6 }} />;

  if (error) return <EstadoError onRetry={() => setIntento((n) => n + 1)} />;

  if (!item) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Elemento no encontrado"
        extra={<Button type="primary" onClick={() => navigate('/catalogo')}>Volver al catálogo</Button>}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Button onClick={() => navigate('/catalogo')}>Volver</Button>
      <Title level={2}>{item.name}</Title>
      <Image width={240} src={item.image} alt={item.name} />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Estado">{item.status}</Descriptions.Item>
        <Descriptions.Item label="Especie">{item.species}</Descriptions.Item>
        <Descriptions.Item label="Género">{item.gender}</Descriptions.Item>
        <Descriptions.Item label="Origen">{item.origin?.name}</Descriptions.Item>
        <Descriptions.Item label="Ubicación">{item.location?.name}</Descriptions.Item>
        <Descriptions.Item label="Episodios">{item.episode?.length}</Descriptions.Item>
      </Descriptions>
    </Space>
  );
}
