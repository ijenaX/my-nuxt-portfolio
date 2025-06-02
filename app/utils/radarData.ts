export interface RadarEntry {
  label: string;
}

export interface RadarRing {
  name: string;
  entries: RadarEntry[];
}

export interface RadarQuadrant {
  name: string;
  rings: RadarRing[];
}

export const radarData: RadarQuadrant[] = [
  {
    name: 'Languages',
    rings: [
      {
        name: 'Adopt',
        entries: [{ label: 'Typescript' }, { label: 'HTML' }, { label: 'CSS' }],
      },
      {
        name: 'Trial',
        entries: [{ label: 'JavaScript' }],
      },
      {
        name: 'Hold',
        entries: [{ label: 'Java' }, { label: 'Python' }, { label: 'Kotlin' }, { label: 'SQLite' }, { label: 'PHP' }],
      },
    ],
  },
  {
    name: 'Frameworks',
    rings: [
      {
        name: 'Adopt',
        entries: [{ label: 'Angular' }],
      },
      {
        name: 'Trial',
        entries: [{ label: 'Vue.js' }, { label: 'Nuxt 3' }, { label: 'Tailwind CSS' }],
      },
      {
        name: 'Hold',
        entries: [],
      },
    ],
  },
  {
    name: 'Tools',
    rings: [
      {
        name: 'Adopt',
        entries: [{ label: 'Inkscape' }, { label: 'GIMP' }, { label: 'Blender' }, { label: 'VS Code' }, { label: 'Git/Github' }],
      },
      {
        name: 'Trial',
        entries: [{ label: 'Terraform' }],
      },
      {
        name: 'Hold',
        entries: [{ label: 'Intellij' }, { label: 'Helm' }, { label: 'Github Actions' }],
      },
    ],
  },
  {
    name: 'Infrastruktur',
    rings: [
      {
        name: 'Adopt',
        entries: [{ label: 'Seatable' }, { label: 'Azure' }],
      },
      {
        name: 'Trial',
        entries: [{ label: 'Kubernetes' }, { label: 'Docker' }],
      },
      {
        name: 'Hold',
        entries: [{ label: 'AWS' }, { label: 'PostgreSQL' }],
      },
    ],
  },
];
