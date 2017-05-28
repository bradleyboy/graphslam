import React from 'react';

const PersonCard = ({ person }) => (
  <div>
    <p>{person.fullName}</p>
    <ul>
      {person.awards.map(({ award, year }, i) => (
        <li key={`${award}-${year}-${i}`}>{award} {year}</li>
      ))}
    </ul>
    <ul>
      {person.appearances.map(({ team, year }) => (
        <li key={`${team.name}-${year}`}>{team.name} {year}</li>
      ))}
    </ul>
  </div>
);

export default PersonCard;
