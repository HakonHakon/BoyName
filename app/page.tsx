import { getNames, getVotes } from './utils/fileOperations';
import { getUserVotes } from './actions';
import { VotingForm } from './components/VotingForm';
import { VoteSummary } from './components/VoteSummary';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const nickname = cookieStore.get('nickname')?.value;

  if (!nickname) {
    redirect('/login');
  }

  const names = await getNames();
  const allVotes = await getVotes();
  const userVotes = await getUserVotes(nickname);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">نام های مورد علاقه</h1>
        <VotingForm names={names} nickname={nickname} initialVotes={userVotes} />
        <VoteSummary votes={allVotes} />
      </div>
      <ThemeSwitcher />
    </div>
  );
}

