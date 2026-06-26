"use client";
import React, { useState, useMemo } from 'react';
import NavBar from '../components/organisms/NavBar';
import Footer from '../components/organisms/Footer';
import StudyGroupGrid from '../components/organisms/StudyGroupGrid';
import StudyGroupFilter from '../components/molecules/StudyGroupFilter';
import StudyGroupSort, { SortOption } from '../components/molecules/StudyGroupSort';
import RequestToJoinModal from '../components/organisms/RequestToJoinModal';
import { mockStudyGroups, StudyGroup } from './mockData';
import { useI18n } from '../providers/I18nProvider';

export default function StudyTogetherPage() {
  const { t } = useI18n();

  // Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Modal State
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Derived subjects list
  const subjects = useMemo(() => {
    const subs = new Set(mockStudyGroups.map(g => g.subject));
    return Array.from(subs);
  }, []);

  // Filtered & Sorted Groups
  const displayedGroups = useMemo(() => {
    let result = [...mockStudyGroups];

    // Filter by subject
    if (subjectFilter) {
      result = result.filter(g => g.subject === subjectFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(g => 
        g.title.toLowerCase().includes(q) || 
        g.description.toLowerCase().includes(q) ||
        g.subject.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'availability') {
        const aAvail = a.status === 'Available' ? 1 : 0;
        const bAvail = b.status === 'Available' ? 1 : 0;
        if (aAvail !== bAvail) return bAvail - aAvail;
      }
      // default "newest" sorting could just be ID based or original order if no timestamp
      return a.id.localeCompare(b.id);
    });

    return result;
  }, [searchQuery, subjectFilter, sortOption]);

  const handleJoinGroup = (id: string) => {
    setSelectedGroupId(id);
  };

  const handleCloseModal = () => {
    setSelectedGroupId(null);
  };

  const handleSendMessage = (message: string) => {
    console.log(`Join request sent for group ${selectedGroupId} with message: ${message}`);
    // Show toast or alert here in real app
    setSelectedGroupId(null);
  };

  const selectedGroup = useMemo(() => {
    return mockStudyGroups.find(g => g.id === selectedGroupId) || null;
  }, [selectedGroupId]);

  return (
    <div className="min-h-screen bg-[#F3EFEA] dark:bg-neutral-950 transition-colors duration-300">
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 py-12 min-h-[calc(100vh-84px-200px)]">
        <div className="flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold font-manrope text-navy dark:text-white">
              {t('study_together.title')}
            </h1>
            <p className="text-[#75777D] dark:text-gray-400 font-inter max-w-2xl">
              {t('study_together.description')}
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-[#EAEAEA] dark:border-neutral-800 shadow-sm">
            <StudyGroupFilter 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              subjectFilter={subjectFilter}
              onSubjectChange={setSubjectFilter}
              subjects={subjects}
            />
            <StudyGroupSort 
              sortOption={sortOption}
              onSortChange={setSortOption}
            />
          </div>

          {/* Content */}
          <StudyGroupGrid 
            groups={displayedGroups} 
            onJoinGroup={handleJoinGroup} 
          />
        </div>
      </main>

      <RequestToJoinModal 
        isOpen={!!selectedGroupId}
        onClose={handleCloseModal}
        onSend={handleSendMessage}
        group={selectedGroup}
      />

      <Footer />
    </div>
  );
}
