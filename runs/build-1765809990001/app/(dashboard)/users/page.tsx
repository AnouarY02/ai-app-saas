import { UserList } from '../../../components/users/user-list';
import { UserForm } from '../../../components/users/user-form';

export default function UsersPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Gebruikersbeheer</h1>
      <UserForm />
      <div className="mt-8">
        <UserList />
      </div>
    </section>
  );
}

