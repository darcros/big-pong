import React from 'react';
import PropTypes from 'prop-types';
import { map } from './util';
import { socket } from './socket';

export const Controller = ({ side }) => {
  const [value, setValue] = React.useState(50);

  React.useEffect(() => {
    let lastValue = 0;

    const interval = setInterval(() => {
      if (value === lastValue) return;
      lastValue = value;

      const position = map(value, 0, 100, 1, 0);
      socket.emit('movePaddle', { position });
    }, 5);

    return () => clearInterval(interval);
  });

  return (
    <React.Fragment>
      <p>Lato: {side === 'left' ? 'sinistro' : 'destro'}</p>
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        orient="vertical"

        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </React.Fragment>
  );
};

Controller.propTypes = {
  side: PropTypes.string.isRequired,
};