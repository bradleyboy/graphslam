import React from 'react';
import {
  Link,
} from 'react-router-dom';

const PersonList = ({ people }) => (
  <div>
    {people.map(({ id, fullName }) => (
      <p key={id}>
        <Link to={`/person/${id}`}>
          {fullName}
        </Link>
      </p>
    ))}
  </div>
);

export default PersonList;
