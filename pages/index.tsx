import { Button, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { useErrorModalActions } from './ErrorModalModule';

export const IndexPage = () => {

  const errorModalActions = useErrorModalActions();

  return (
    <div>
      <Container style={{ marginTop: 50 }}>
        <Button
          onClick={() => {
            errorModalActions.show('foo');
          }}
        >
          Show error
        </Button>
      </Container>
    </div>
  );
}

export default IndexPage;