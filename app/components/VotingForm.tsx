'use client'

import { useState } from 'react';
import { vote } from '../actions';

const voteOptions = ["دوسش دارم", "بد نیست", "شاید", "کاملا مخالفم"];

export function VotingForm({ names, nickname, initialVotes }: { names: string[], nickname: string, initialVotes: Record<string, string> }) {
  const [votes, setVotes] = useState<Record<string, string>>(initialVotes);

  const handleVote = async (name: string, voteOption: string) => {
    await vote(name, voteOption, nickname);
    setVotes(prev => ({ ...prev, [name]: voteOption }));
  };

  return (
    <div className="space-y-4">
      {names.map(name => (
        <div key={name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <div className="flex space-x-2">
            {voteOptions.map(option => (
              <button
                key={option}
                onClick={() => handleVote(name, option)}
                className={`px-3 py-1 rounded ${
                  votes[name] === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

