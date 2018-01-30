import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="FacebookEvent__loading my-3">
      <ReactLoading
        className="mb-3"
        type="spinningBubbles"
        delay={0}
        color="#000"
        height={60}
        width={60}
      />
      Carregando...
    </div>
  );
};

export default Loading;
