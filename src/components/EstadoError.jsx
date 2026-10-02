import { Result, Button } from 'antd';

export default function EstadoError({ onRetry }) {
  return (
    <Result
      status="error"
      title="No se pudo cargar la información"
      subTitle="Revisá tu conexión o intentá de nuevo en unos segundos."
      extra={<Button type="primary" onClick={onRetry}>Reintentar</Button>}
    />
  );
}
