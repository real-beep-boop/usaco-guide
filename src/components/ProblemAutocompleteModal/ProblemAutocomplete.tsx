import * as React from 'react';
import { AlgoliaProblemInfo } from '../../models/problem';
import {
  moduleIDToSectionMap,
  SECTION_LABELS,
} from '../../../content/ordering';

const ProblemAutocompleteHit = ({
  hit,
  onClick,
}: {
  hit: AlgoliaProblemInfo;
  onClick: (problem: AlgoliaProblemInfo) => any;
}) => {
  return (
    <li key={hit.objectID}>
      <button
        className="p-4 bg-gray-50 rounded-lg text-left w-full focus:outline-none group hover:bg-light-blue-500 hover:text-white"
        onClick={() => onClick(hit)}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {hit.source} {hit.name}
          </span>
          <span>
            {hit.isStarred ? 'Starred • ' : ''}
            {hit.difficulty}
          </span>
        </div>
        <div className="md:flex md:items-center md:justify-between text-sm text-gray-700 group-hover:text-light-blue-100">
          <span>
            Tags: {hit.tags?.length > 0 ? hit.tags.join(', ') : 'None'}
          </span>
          <span className="max-w-xs truncate">
            Appears in{' '}
            {hit.problemModules &&
              `${hit.problemModules.map(x => `${x.title}`).join(', ')}`}
          </span>
        </div>
      </button>
    </li>
  );
};

export const ProblemAutocomplete = ({
  hits,
  currentRefinement,
  refine,
  onProblemSelect,
}) => (
  <div>
    <div>
      <input
        type="text"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="Problem Name"
        value={currentRefinement}
        onChange={e => refine(e.currentTarget.value)}
      />
    </div>
    <ul className="overflow-y-auto mt-2 space-y-2" style={{ height: '40rem' }}>
      {hits.map(hit => (
        <ProblemAutocompleteHit
          hit={hit}
          key={hit.objectID}
          onClick={p => onProblemSelect(p)}
        />
      ))}
    </ul>
  </div>
);
