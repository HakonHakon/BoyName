import fs from 'fs/promises';
import path from 'path';

const namesPath = path.join(process.cwd(), 'data', 'names.txt');
const votesPath = path.join(process.cwd(), 'data', 'votes.json');

export async function getNames(): Promise<string[]> {
  const content = await fs.readFile(namesPath, 'utf-8');
  return content.split('\n').filter(Boolean);
}

export async function getVotes(): Promise<Record<string, Record<string, number>>> {
  try {
    const content = await fs.readFile(votesPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return {};
  }
}

export async function saveVote(name: string, vote: number, nickname: string): Promise<void> {
  const votes = await getVotes();
  if (!votes[name]) {
    votes[name] = {};
  }
  votes[name][nickname] = vote;
  await fs.writeFile(votesPath, JSON.stringify(votes, null, 2));
}

