import { NetworkData, HCP } from '../types/network.types';

export const mockHCPs: HCP[] = [
  {
    id: 'emily-carter',
    name: 'Dr. Emily Carter',
    title: 'Cardiologist',
    organization: 'NHLSS',
    specialization: 'Cardiology',
    location: 'Boston, MA',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    peers: 232,
    following: 124,
    successRate: 95,
    patientServed: 1000,
    education: [
      {
        institution: 'Harvard Medical University',
        degree: 'Cardiology Degree',
        field: 'Specialization in Heart Health',
        year: '2010-2015',
        logoUrl: 'harvard-logo.png'
      }
    ],
    workExperience: [
      {
        position: 'Senior Cardiologist',
        organization: 'Massachusetts General Hospital',
        startYear: '2015',
        current: true
      }
    ],
    publications: [
      {
        id: 'pub1',
        title: 'Advances in Cardiac Arrhythmia Treatment',
        type: 'journal',
        year: '2023',
        journal: 'Journal of Cardiology',
        coAuthors: ['Dr. Michael Chen', 'Dr. Sarah Williams']
      }
    ]
  },
  {
    id: 'michael-chen',
    name: 'Dr. Michael Chen',
    title: 'Cardiac Surgeon',
    organization: 'Stanford Medical Center',
    specialization: 'Cardiac Surgery',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    peers: 189,
    following: 98,
    education: [
      {
        institution: 'Stanford University',
        degree: 'MD, PhD',
        field: 'Cardiac Surgery',
        year: '2008-2014'
      }
    ]
  },
  {
    id: 'sarah-williams',
    name: 'Dr. Sarah Williams',
    title: 'Cardiovascular Researcher',
    organization: 'Johns Hopkins',
    specialization: 'Cardiovascular Research',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    peers: 156,
    following: 87,
    publications: [
      {
        id: 'pub2',
        title: 'Novel Biomarkers in Heart Disease',
        type: 'journal',
        year: '2023',
        journal: 'Nature Medicine'
      }
    ]
  },
  {
    id: 'david-johnson',
    name: 'Dr. David Johnson',
    title: 'Electrophysiologist',
    organization: 'Cleveland Clinic',
    specialization: 'Electrophysiology',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    peers: 145,
    following: 76
  },
  {
    id: 'lisa-anderson',
    name: 'Dr. Lisa Anderson',
    title: 'Pediatric Cardiologist',
    organization: "Boston Children's Hospital",
    specialization: 'Pediatric Cardiology',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    peers: 178,
    following: 92
  },
  {
    id: 'robert-brown',
    name: 'Dr. Robert Brown',
    title: 'Interventional Cardiologist',
    organization: 'Mayo Clinic',
    specialization: 'Interventional Cardiology',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    peers: 201,
    following: 115
  },
  {
    id: 'jennifer-davis',
    name: 'Dr. Jennifer Davis',
    title: 'Heart Failure Specialist',
    organization: 'UCLA Medical Center',
    specialization: 'Heart Failure',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    peers: 167,
    following: 89
  },
  {
    id: 'james-wilson',
    name: 'Dr. James Wilson',
    title: 'Cardiac Imaging Specialist',
    organization: 'Northwestern Memorial',
    specialization: 'Cardiac Imaging',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    peers: 134,
    following: 71
  },
  {
    id: 'patricia-martinez',
    name: 'Dr. Patricia Martinez',
    title: 'Preventive Cardiologist',
    organization: 'NYU Langone',
    specialization: 'Preventive Cardiology',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
    peers: 152,
    following: 83
  },
  {
    id: 'william-garcia',
    name: 'Dr. William Garcia',
    title: 'Cardiac Geneticist',
    organization: 'Cedars-Sinai',
    specialization: 'Cardiac Genetics',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William',
    peers: 121,
    following: 65
  },
  {
    id: 'susan-rodriguez',
    name: 'Dr. Susan Rodriguez',
    title: 'Cardiovascular Pharmacologist',
    organization: 'Duke University Medical',
    specialization: 'Cardiovascular Pharmacology',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Susan',
    peers: 143,
    following: 78
  },
  {
    id: 'charles-lee',
    name: 'Dr. Charles Lee',
    title: 'Structural Heart Specialist',
    organization: 'Mount Sinai',
    specialization: 'Structural Heart Disease',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charles',
    peers: 158,
    following: 84
  },
  {
    id: 'mary-walker',
    name: 'Dr. Mary Walker',
    title: 'Cardiac Rehabilitation Specialist',
    organization: 'UCSF Medical',
    specialization: 'Cardiac Rehabilitation',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary',
    peers: 129,
    following: 69
  },
  {
    id: 'thomas-hall',
    name: 'Dr. Thomas Hall',
    title: 'Vascular Surgeon',
    organization: 'Penn Medicine',
    specialization: 'Vascular Surgery',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas',
    peers: 172,
    following: 91
  },
  {
    id: 'nancy-allen',
    name: 'Dr. Nancy Allen',
    title: 'Lipid Specialist',
    organization: 'Brigham and Women\'s',
    specialization: 'Lipidology',
    profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nancy',
    peers: 138,
    following: 74
  }
];

export const generateNetworkData = (centerNodeId: string): NetworkData => {
  const centerNode = mockHCPs.find(hcp => hcp.id === centerNodeId) || mockHCPs[0];
  const otherNodes = mockHCPs.filter(hcp => hcp.id !== centerNodeId);
  
  const nodes = [
    { ...centerNode, fx: 0, fy: 0 },
    ...otherNodes.slice(0, 14)
  ];

  const links = [
    // Co-author connections
    {
      source: 'emily-carter',
      target: 'michael-chen',
      type: 'co-author' as const,
      strength: 0.8,
      label: 'Co-authored 3 publications',
      publications: 3
    },
    {
      source: 'emily-carter',
      target: 'sarah-williams',
      type: 'co-author' as const,
      strength: 0.7,
      label: 'Co-authored 2 publications',
      publications: 2
    },
    {
      source: 'emily-carter',
      target: 'david-johnson',
      type: 'colleague' as const,
      strength: 0.6,
      label: 'Worked together at MGH',
      sharedInstitution: 'Massachusetts General Hospital'
    },
    {
      source: 'emily-carter',
      target: 'lisa-anderson',
      type: 'education' as const,
      strength: 0.5,
      label: 'Harvard Medical alumni',
      sharedInstitution: 'Harvard Medical University'
    },
    {
      source: 'michael-chen',
      target: 'robert-brown',
      type: 'co-author' as const,
      strength: 0.6,
      label: 'Co-authored 1 publication',
      publications: 1
    },
    {
      source: 'sarah-williams',
      target: 'jennifer-davis',
      type: 'colleague' as const,
      strength: 0.5,
      label: 'Research collaboration'
    },
    {
      source: 'david-johnson',
      target: 'james-wilson',
      type: 'institution' as const,
      strength: 0.4,
      label: 'Same department'
    },
    {
      source: 'lisa-anderson',
      target: 'patricia-martinez',
      type: 'education' as const,
      strength: 0.4,
      label: 'Fellowship together'
    },
    {
      source: 'robert-brown',
      target: 'william-garcia',
      type: 'co-author' as const,
      strength: 0.5,
      label: 'Co-authored 2 publications',
      publications: 2
    },
    {
      source: 'jennifer-davis',
      target: 'susan-rodriguez',
      type: 'colleague' as const,
      strength: 0.4,
      label: 'Clinical trial collaboration'
    },
    {
      source: 'james-wilson',
      target: 'charles-lee',
      type: 'institution' as const,
      strength: 0.3,
      label: 'Imaging department'
    },
    {
      source: 'patricia-martinez',
      target: 'mary-walker',
      type: 'co-author' as const,
      strength: 0.4,
      label: 'Co-authored 1 publication',
      publications: 1
    },
    {
      source: 'william-garcia',
      target: 'thomas-hall',
      type: 'colleague' as const,
      strength: 0.3,
      label: 'Joint research project'
    },
    {
      source: 'susan-rodriguez',
      target: 'nancy-allen',
      type: 'education' as const,
      strength: 0.3,
      label: 'Duke University alumni',
      sharedInstitution: 'Duke University'
    }
  ];

  return { nodes, links };
};