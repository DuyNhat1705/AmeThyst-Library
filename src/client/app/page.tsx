import HomeLayout from './components/templates/HomeLayout';
import NavBar from './components/organisms/NavBar';
import HeroSection from './components/organisms/HeroSection';
import SearchBar from './components/molecules/SearchBar';
import PopularPublishes from './components/organisms/PopularPublishes';
import StudyGroup from './components/organisms/StudyGroup';
import Footer from './components/organisms/Footer';

export default function Home() {
  return (
    <HomeLayout
      navbar={<NavBar />}
      hero={<HeroSection />}
      searchBar={<SearchBar />}
      popularPublishes={<PopularPublishes />}
      studyGroup={<StudyGroup />}
      footer={<Footer />}
    />
  );
}
