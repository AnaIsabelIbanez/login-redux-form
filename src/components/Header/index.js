import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const StyledHeader = styled.div`
    text-align: center;
    font-size: 1.7em;
    font-weight: bold;
    padding: 1em;
    margin-bottom: 1.5em; 
    background: #323232;
    color: white;
`;

const Header = ({ title, name, signOut }) => {
  return (
    <StyledHeader>
      {title}
      <div className="pull-right">
        {name} {name && <Button onClick={() => signOut()}>Sign out</Button>}
      </div>
    </StyledHeader>
  );
};

Header.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  name: PropTypes.string,
  signOut: PropTypes.func,
};

export default Header;
