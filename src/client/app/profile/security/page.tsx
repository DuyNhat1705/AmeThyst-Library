import ProfileTemplate from '../../components/templates/ProfileTemplate';
import SecurityFormCard from '../SecurityFormCard';

export default function SecurityPage() {
  return (
    <ProfileTemplate username="Alex Johnson">
      <div className="flex justify-center">
        <SecurityFormCard />
      </div>
    </ProfileTemplate>
  );
}
