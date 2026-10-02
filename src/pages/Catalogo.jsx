import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, Col, Empty, Input, Row, Skeleton, Typography } from 'antd';
import { getItems } from '../services/api.js';
import EstadoError from '../components/EstadoError.jsx';

const { Title } = Typography;

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscar = searchParams.get('buscar') ?? '';

  const [texto, setTexto] = useState(buscar);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    setTexto(buscar);
  }, [buscar]);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const data = await getItems(buscar);
        if (!cancelado) setItems(data);
      } catch {
        if (!cancelado) setError(true);
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [buscar, intento]);

  const handleSearch = (valor) => {
    const limpio = valor.trim();
    setSearchParams(limpio ? { buscar: limpio } : {});
  };

  let contenido;
  if (loading) {
    contenido = <Skeleton active paragraph={{ rows: 8 }} />;
  } else if (error) {
    contenido = <EstadoError onRetry={() => setIntento((n) => n + 1)} />;
  } else if (items.length === 0) {
    contenido = <Empty description="No se encontraron personajes" />;
  } else {
    contenido = (
      <Row gutter={[16, 16]}>
        {items.map((p) => (
          <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/catalogo/${p.id}`}>
              <Card hoverable cover={<img alt={p.name} src={p.image} />}>
                <Card.Meta title={p.name} description={`${p.species} · ${p.status}`} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <Title level={2}>Catálogo</Title>
      <Input.Search
        placeholder="Buscar personaje por nombre"
        allowClear
        enterButton="Buscar"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onSearch={handleSearch}
        style={{ maxWidth: 420, marginBottom: 24 }}
      />
      {contenido}
    </>
  );
}
