import { NextResponse } from 'next/server';
import { Record } from '../../types';

interface FilterRecordsParams {
  data: Record[];
  searchTerm?: string | null;
  filters?: string[] | null;
}

const DUMMY_RESPONSE_DATA = [
  {
    id: 1,
    title: 'Mindful Moments',
    description:
      'A series of guided meditations and mindfulness exercises tailored for young students.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 2,
    title: 'Teen Stress Workshop',
    description:
      'An interactive workshop discussing stress management techniques for teenagers.',
    grades: ['9-12'],
  },
  {
    id: 3,
    title: 'Healthy Communication Skills',
    description:
      'A resource that teaches effective communication skills and emotional expression.',
    grades: ['6-8', '9-12'],
  },
  {
    id: 4,
    title: 'Understanding Emotions',
    description:
      'Educational content focused on understanding and managing emotions, suitable for younger students.',
    grades: ['3-5'],
  },
  {
    id: 5,
    title: 'Building Resilience',
    description:
      'A guide on developing resilience and coping strategies for various age groups.',
    grades: ['3-5', '6-8', '9-12'],
  },
  {
    id: 6,
    title: 'Social Skills for School',
    description:
      'Activities and lessons focused on enhancing social skills in a school environment.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 7,
    title: 'Calm Classroom Techniques',
    description:
      'A collection of calming techniques and classroom exercises to promote a peaceful learning environment.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 8,
    title: 'Peer Support Training',
    description:
      'A training module for students to learn peer support and active listening skills.',
    grades: ['9-12'],
  },
  {
    id: 9,
    title: 'Digital Wellbeing Guide',
    description:
      'Resources and tips for maintaining mental health in the digital age, tailored for older students.',
    grades: ['9-12'],
  },
  {
    id: 10,
    title: 'Family Communication Workshop',
    description:
      'Workshop materials focusing on improving family communication and understanding within the household.',
    grades: ['3-5', '6-8', '9-12'],
  },
  {
    id: 11,
    title: 'Mindfulness for Educators',
    description:
      'Guidance and exercises for educators to practice mindfulness and stress reduction techniques.',
    grades: [],
  },
  {
    id: 12,
    title: 'Conflict Resolution Skills',
    description:
      'A guide to developing conflict resolution skills in children and teenagers.',
    grades: ['6-8', '9-12'],
  },
  {
    id: 13,
    title: 'Art Therapy Activities',
    description:
      'A set of art-based activities designed to encourage emotional expression and creativity.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 14,
    title: 'Bullying Prevention Guide',
    description:
      'Comprehensive materials on recognizing, preventing, and addressing bullying in schools.',
    grades: ['6-8', '9-12'],
  },
  {
    id: 15,
    title: 'Self-esteem Building Exercises',
    description:
      'Exercises and lessons aimed at building self-esteem and positive self-image in students.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 16,
    title: 'Navigating Social Media',
    description:
      'Guidance for teens on using social media responsibly and maintaining mental health online.',
    grades: ['9-12'],
  },
  {
    id: 17,
    title: 'Emotional Literacy Workshop',
    description:
      'Interactive sessions designed to enhance emotional literacy among younger students.',
    grades: ['3-5'],
  },
  {
    id: 18,
    title: 'Stress Management for High Schoolers',
    description:
      'A series of lessons and activities focusing on stress management techniques for high school students.',
    grades: ['9-12'],
  },
  {
    id: 19,
    title: 'Anxiety Support Group',
    description:
      'Information about peer-led support groups for students dealing with anxiety.',
    grades: ['6-8', '9-12'],
  },
  {
    id: 20,
    title: 'Healthy Sleep Habits',
    description:
      'Educational resources promoting healthy sleep habits for improved mental well-being.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 21,
    title: 'Positive Mindset Exercises',
    description:
      'A collection of exercises aimed at fostering a positive mindset in school-aged children.',
    grades: ['3-5', '6-8'],
  },
  {
    id: 22,
    title: 'Coping with Change',
    description:
      'Resources and activities focused on helping students cope with change and transitions.',
    grades: ['6-8', '9-12'],
  },
  {
    id: 23,
    title: 'Resilience Building for Teens',
    description:
      'A program aimed at building resilience and adaptability in teenagers.',
    grades: ['9-12'],
  },
  {
    id: 25,
    title: 'Understanding ADHD',
    description:
      'Educational materials for students, teachers, and parents about understanding and supporting ADHD.',
    grades: [],
  },
];

const filterRecords = ({
  data,
  searchTerm,
  filters,
}: FilterRecordsParams): Record[] => {
  return data.filter((item) => {
    const matchedSearchTerm =
      searchTerm && item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchedFilter =
      filters && filters.some((filter) => item.grades.includes(filter));
    if (searchTerm && (!filters || filters.length === 0)) {
      return matchedSearchTerm;
    } else if (!searchTerm && filters && filters.length > 0) {
      return matchedFilter;
    }
    return matchedSearchTerm && matchedFilter;
  });
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('searchTerm');
  const filters = searchParams.getAll('filters');

  if (!searchTerm && (!filters || filters.length === 0)) {
    const sortedResults = DUMMY_RESPONSE_DATA.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return NextResponse.json(sortedResults);
  }

  const searchResults = filterRecords({
    data: DUMMY_RESPONSE_DATA,
    searchTerm,
    filters,
  });
  const sortedResults = searchResults.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return NextResponse.json(sortedResults);
}
