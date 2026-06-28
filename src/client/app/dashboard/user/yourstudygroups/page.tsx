"use client";

import React, { useState } from 'react';
import { mockJoinedGroups, mockCreatedGroups, StudyGroup } from '../../../study-together/mockData';
import StudyGroupCard from '../../../components/molecules/StudyGroupCard';
import StudyGroupInfoModal from '../../../components/organisms/StudyGroupInfoModal';
import { I18nProvider } from '../../../providers/I18nProvider';

export default function YourStudyGroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<StudyGroup | null>(null);
  const [modalMode, setModalMode] = useState<'explore' | 'joined' | 'created'>('explore');
  const [activeTab, setActiveTab] = useState<'created' | 'joined'>('created');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleCardClick = (id: string, mode: 'explore' | 'joined' | 'created') => {
    let group = mockJoinedGroups.find(g => g.id === id);
    if (!group) group = mockCreatedGroups.find(g => g.id === id);
    if (group) {
      setSelectedGroup(group);
      setModalMode(mode);
    }
  };

  const handleTabChange = (tab: 'created' | 'joined') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const currentItems = activeTab === 'created' ? mockCreatedGroups : mockJoinedGroups;
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const displayedItems = currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <I18nProvider>
      <div className="w-full min-h-screen bg-[#F3EFEA] dark:bg-neutral-900 py-12 px-6">
        <div className="max-w-[1040px] mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col items-start gap-4 w-full">
            <h1 className="text-[#000] dark:text-white font-hankenGrotesk text-[32px] font-bold leading-10 tracking-[-0.02em]">
              Your Study Groups
            </h1>
            <div className="flex items-start gap-8 border-b border-[#C2C7CF] dark:border-neutral-800 w-full">
              <button 
                onClick={() => handleTabChange('created')}
                className={`pb-4 border-b-2 font-hankenGrotesk text-sm transition-colors ${activeTab === 'created' ? 'border-[#42474E] dark:border-white text-[#595C61] dark:text-white font-bold' : 'border-transparent text-[#42474E] dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              >
                Groups I created
              </button>
              <button 
                onClick={() => handleTabChange('joined')}
                className={`pb-4 border-b-2 font-hankenGrotesk text-sm transition-colors ${activeTab === 'joined' ? 'border-[#42474E] dark:border-white text-[#595C61] dark:text-white font-bold' : 'border-transparent text-[#42474E] dark:text-gray-400 hover:text-black dark:hover:text-white'}`}
              >
                Groups I joined
              </button>
            </div>
          </div>

          <div className="space-y-12">
            <section className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedItems.map((group) => (
                  <div key={group.id} className="transform transition-transform scale-[0.95] origin-top">
                    <StudyGroupCard
                      {...group}
                      viewMode={activeTab}
                      onCardClick={(id) => handleCardClick(id, activeTab)}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg font-inter text-sm font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Previous page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {(() => {
                    const pages = [];
                    const range = 1;

                    if (totalPages > 1) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => handlePageChange(1)}
                          className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors cursor-pointer ${
                            currentPage === 1 ? "bg-[#006A61] dark:bg-teal-600 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }`}
                        >
                          1
                        </button>
                      );
                    }

                    if (currentPage > range + 2) {
                      pages.push(<span key="left-dots" className="px-1 text-neutral-500 font-bold">...</span>);
                    }

                    const start = Math.max(2, currentPage - range);
                    const end = Math.min(totalPages - 1, currentPage + range);

                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors cursor-pointer ${
                            currentPage === i ? "bg-[#006A61] dark:bg-teal-600 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }

                    if (currentPage < totalPages - range - 1) {
                      pages.push(<span key="right-dots" className="px-1 text-neutral-500 font-bold">...</span>);
                    }

                    if (totalPages > 1) {
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => handlePageChange(totalPages)}
                          className={`w-8 h-8 rounded-lg font-inter text-sm font-semibold transition-colors cursor-pointer ${
                            currentPage === totalPages ? "bg-[#006A61] dark:bg-teal-600 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }`}
                        >
                          {totalPages}
                        </button>
                      );
                    }

                    return pages;
                  })()}

                  <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg font-inter text-sm font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label="Next page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              )}
            </section>
          </div>

        </div>
        <StudyGroupInfoModal
          isOpen={!!selectedGroup}
          onClose={() => setSelectedGroup(null)}
          group={selectedGroup}
          viewMode={modalMode}
        />
      </div>
    </I18nProvider>
  );
}
