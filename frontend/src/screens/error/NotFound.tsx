import React from 'react';
import { Result, Button } from 'antd';

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você visitou não existe."
      extra={
        <Button type="primary" href="/">
          Voltar para a página inicial
        </Button>
      }
    />
  );
};

export default NotFound;