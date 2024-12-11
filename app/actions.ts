'use server'

import { saveVote, getVotes } from './utils/fileOperations';

export async function vote(name: string, voteOption: string, nickname: string) {
  await saveVote(name, voteOption, nickname);
}

export async function getUserVotes(nickname: string) {
  const allVotes = await getVotes();
  const userVotes: Record<string, string> = {};
  
  for (const [name, votes] of Object.entries(allVotes)) {
    if (votes[nickname]) {
      userVotes[name] = votes[nickname];
    }
  }
  
  return userVotes;
}

