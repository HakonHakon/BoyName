export function VoteSummary({ votes }: { votes: Record<string, Record<string, string>> }) {
    // Calculate vote counts and collect voters for each name
    const voteDetails = Object.entries(votes).reduce((acc, [name, userVotes]) => {
      acc[name] = {
        counts: { 'love it': 0, 'not bad': 0, 'maybe': 0, 'rejected': 0 },
        voters: { 'love it': [], 'not bad': [], 'maybe': [], 'rejected': [] }
      };
      
      Object.entries(userVotes).forEach(([user, vote]) => {
        acc[name].counts[vote]++;
        acc[name].voters[vote].push(user);
      });
      return acc;
    }, {} as Record<string, {
      counts: Record<string, number>,
      voters: Record<string, string[]>
    }>);

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Vote Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Love it</th>
                <th className="py-3 px-6 text-center">Not bad</th>
                <th className="py-3 px-6 text-center">Maybe</th>
                <th className="py-3 px-6 text-center">Rejected</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-200 text-sm font-light">
              {Object.entries(voteDetails).map(([name, details]) => (
                <tr key={name} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{name}</td>
                  <td className="py-3 px-6 text-center">
                    <div>{details.counts['love it']}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{details.voters['love it'].join(', ')}</div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div>{details.counts['not bad']}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{details.voters['not bad'].join(', ')}</div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div>{details.counts['maybe']}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{details.voters['maybe'].join(', ')}</div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div>{details.counts['rejected']}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{details.voters['rejected'].join(', ')}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }